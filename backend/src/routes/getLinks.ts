import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import {prisma} from '../lib/prisma'
import {dayjs} from "../lib/dayjs";
import { clientError } from "../errors/client-error";

export async function getLinks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/trips/:tripId/links', {
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
                links:true,

            }
        })
        if (!trip){
            throw new clientError ('Trip not found.')
        }
        return ( {links: trip.links} )
    },)
}
