import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { clientError } from "../errors/client-error";

export async function updateTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put('/trips/:tripId', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                destination: z.string().min(4),
                startDate: z.coerce.date(),
                endDate: z.coerce.date(),
            })
        },
    }, async (request, reply) => {
        const {tripId} = request.params
        const { destination, startDate, endDate } = request.body

        const trip = await prisma.trip.findUnique({
            where: {id: tripId}
        })

        if (!trip){
            throw new clientError ('Trip not found.')
        }
        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                isConfirmed: true
            }
        })

        if (dayjs(startDate).isBefore(new Date())) {
            throw new clientError('Invalid Date: Start date must be in the future.')
        }

        if (dayjs(endDate).isBefore(startDate)) {
            throw new clientError('Invalid Date: End date must be after start date.')
        }

        await prisma.trip.update ({
            where: {id: tripId},
            data: {
                destination, 
                startDate,
                endDate
            }
        })

        return ({ tripId: trip.id })
    })
}
