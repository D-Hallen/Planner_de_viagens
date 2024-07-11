import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod' //biblioteca do ZOD para validação de dados
import { prisma } from "../lib/prisma";
import {dayjs} from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer'
import { clientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmTrip(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            })
        },
    }, async (request, reply) => {
        const {tripId} = request.params

        const trip = await prisma.trip.findUnique({
            where: {
                id: tripId
            },
            include: {
                participants: {
                    where:{
                        isOwner: false
                    }
                }
            }
        })

        if (!trip){
            throw new clientError ('Trip not found.')
        }

        if (trip.isConfirmed){
            return reply.redirect(`${env.FRONT_URL}/trips/${tripId}`)
        }

        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                isConfirmed: true
            }
        })


        const formattedStartDate = dayjs(trip.startDate).format('LL')
        const formattedEndDate = dayjs(trip.endDate).format('LL')

        const mail = await getMailClient()
        
        await Promise.all(trip.participants.map(async (participant) => {
            const confirmURL = `${env.API_BASE_URL}/participants/${participant.id}/confirm`
            const message = await mail.sendMail({
                from: {
                    name: 'Equipe Plann.er',
                    address: 'authenticate@plann.er'
                },
                to: participant.email,

                subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}`,
                html: `
                <head>
    <style>
        *{
            font-family: sans-serif;
            font-size: 16px;
            line-height: 160%;
        }
        small{
            font-size: 12px;
            color: #777;
            }
    </style>
</head>
<body>
    <div>
        <p>Você foi convidado(a) para uma viagem para ${trip.destination} 
        nas datas <strong>${formattedStartDate}</strong> à <strong>${formattedEndDate}</strong></p>
            <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
        <a href="${confirmURL}">Confirmar presença</a>
        <br>
        <p>Caso esteja utilizando um dispositivo móvel, você também pode confirmar a criação
            da viagem pelos aplicativos:
        <br>
        <p><a href="${confirmURL}">Aplicativo para Android</a></p>
        <p><a href="${confirmURL}">Aplicativo para iPhone</a></p>
        <hr>
        <p>Caso você não saiba do que se trata essa mensagem ou não puder participar, apenas ignore esta mensagem</p>
        <small>Caso tenha qualquer duvida, entre em contato conosco: <strong>sac.duvidas@plann.er</strong></small>
        <p>Atenciosamente, equipe Plann.er.</p>
    </div>
</body>
</html>
                `.trim()
            })
            console.log('E-MAIL:', nodemailer.getTestMessageUrl(message))
        }))

        return reply.redirect(`${env.FRONT_URL}/trips/${tripId}`)
    })
}
