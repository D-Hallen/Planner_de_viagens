import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import {prisma} from '../lib/prisma'
import {dayjs} from "../lib/dayjs";
import { clientError } from "../errors/client-error";

export async function getTripDetails(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/trips/:tripId', {
        schema: {
            params: z.object({
              tripId: z.string().uuid()  
            }),
        },
    }, async (request) => {
        const { tripId } = request.params
        const trip = await prisma.trip.findUnique({
            select: {
                id: true,
                destination: true,
                startDate: true,
                endDate: true,
                isConfirmed: true
            },
            where:{
                id: tripId
            }
        })
        if (!trip){
            throw new clientError ('Trip not found.')
        }


        return ( {trip} )
    },)
}
