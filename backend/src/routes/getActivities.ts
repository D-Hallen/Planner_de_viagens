import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import {prisma} from '../lib/prisma'
import {dayjs} from "../lib/dayjs";
import { clientError } from "../errors/client-error";

export async function getActivities(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/trips/:tripId/activities', {
        schema: {
            params: z.object({
              tripId: z.string().uuid()  
            }),
        },
    }, async (request) => {
        const { tripId } = request.params
        const trip = await prisma.trip.findUnique({
            where:{
                id: tripId
            },
            include: {
                activities:{
                    orderBy: {
                        date: 'asc'
                    }
                }

            }
        })
        if (!trip){
            throw new clientError ('Trip not found.')
        }

        const differenceBetweenTripDays = dayjs(trip.endDate).diff(trip.startDate, 'days') //quantidade de dias da viagem

        const activities = Array.from({length: differenceBetweenTripDays + 1}).map((_, index) => {
            const date = dayjs(trip.startDate).add(index, 'day')
            return {
                date: date.toDate(),
                activities: trip.activities.filter(activity => {
                    return dayjs(activity.date).isSame(date, 'day') //retorna um array com as atividades separadas por dia
                })
            }
        })


        return ({ activities })
    })
}
