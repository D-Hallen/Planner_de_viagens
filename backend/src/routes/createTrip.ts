import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod' //biblioteca do ZOD para validação de dados
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer'
import {dayjs} from "../lib/dayjs";
import { clientError } from "../errors/client-error";
import { env } from "../env";

export async function createTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/trips', {
        schema: {
            body: z.object({
                destination: z.string().min(4),
                startDate: z.coerce.date(),
                endDate: z.coerce.date(),
                ownerName: z.string(),
                ownerEmail: z.string().email(),
                emailsToInvite: z.array(z.string().email())
            })
        },
    }, async (request) => {
        const { destination, startDate, endDate, ownerName, ownerEmail, emailsToInvite } = request.body

        if (dayjs(startDate).isBefore(new Date())) {
            throw new clientError('Invalid Date: Start date must be in the future.')
        }

        if (dayjs(endDate).isBefore(startDate)) {
            throw new clientError('Invalid Date: End date must be after start date.')
        }

        const trip = await prisma.trip.create({
            data: {
                destination,
                startDate,
                endDate,
                participants: { //criando uma transação para criar o participante
                    createMany: {
                        data: [
                            {
                                name: ownerName,
                                email: ownerEmail,
                                isOwner: true,
                                isConfirmed: true
                            },
                            ...emailsToInvite.map(email => {
                                return { email }
                            })

                        ]
                    }
                }
            }
        })
 
        const formattedStartDate = dayjs(startDate).format('LL')
        const formattedEndDate = dayjs(endDate).format('LL')
        const confirmURL = `${env.API_BASE_URL}/trips/${trip.id}/confirm`
        const mail = await getMailClient()

        const message = await mail.sendMail({
            from: {
                name: 'Equipe Plann.er',
                address: 'authenticate@plann.er'
            },
            to: {
                name: ownerName,
                address: ownerEmail,
            },
            subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
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
                    <p>Você solicitou uma viagem para ${destination} 
                    nas datas <strong>${formattedStartDate}</strong> à <strong>${formattedEndDate}</strong></p>
                        <p>Para confirmar sua presença, clique no link abaixo:</p>
                    <a href="${confirmURL}">Confirmar presença</a>
                    <br>
                    <p>Caso esteja utilizando um dispositivo móvel, você também pode confirmar a criação
                        da viagem pelos aplicativos:
                    <br>
                    <p><a href="${confirmURL}">Aplicativo para Android</a></p>
                    <p><a href="${confirmURL}">Aplicativo para iPhone</a></p>
                    <hr>
                    <p>Caso você não tenha solicitado esta viagem, ignore esta mensagem</p>
                    <small>Caso tenha qualquer duvida, entre em contato conosco: <strong>sac.duvidas@plann.er</strong></small>
                    <p>Atenciosamente, equipe Plann.er.</p>
                </div>
            </body>
            </html>
            `.trim()
        })

        console.log('E-MAIL:', nodemailer.getTestMessageUrl(message))

        return ({ tripId: trip.id })
    })
}
