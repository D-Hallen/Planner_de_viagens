import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import { prisma } from '../lib/prisma';
import { clientError } from "../errors/client-error";

export async function createLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '/trips/:tripId/links', {
        schema: {
            params: z.object({
              tripId: z.string().uuid()  
            }),
            body: z.object({
                title: z.string().min(4),
                url: z.string().url()
            })
        },
    }, async (request) => {
        const { tripId } = request.params
        const { title, url } = request.body
        const trip = await prisma.trip.findUnique({
            where:{
                id: tripId
            }
        })
        if (!trip){
            throw new clientError ('Trip not found.')
        }

        const link = await prisma.link.create({
            data:{
                title, url, tripId: tripId
            }
        })

        return ({ linkId: link.id })
    })
}
