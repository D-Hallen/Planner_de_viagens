import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import {prisma} from '../lib/prisma'
import {dayjs} from "../lib/dayjs";

export async function createActivity(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/trips/:tripId/activities', {
        schema: {
            params: z.object({
              tripId: z.string().uuid()  
            }),
            body: z.object({
                title: z.string().min(4),
                date: z.coerce.date()
            })
        },
    }, async (request) => {
        const { tripId } = request.params
        const { title, date } = request.body
        const trip = await prisma.trip.findUnique({
            where:{
                id: tripId
            }
        })
        if (!trip){
            throw new Error ('Trip not found.')
        }

        if (dayjs(date).isBefore(trip.startDate)){
            throw new Error ('Invalid activity date')
        }
        if (dayjs(date).isAfter(trip.endDate)){
            throw new Error ('Invalid activity date')
        }
        const activity = await prisma.activity.create({
            data:{
                title, date, tripId: tripId
            }
        })

        return ({ activityId: activity.id })
    })
}
