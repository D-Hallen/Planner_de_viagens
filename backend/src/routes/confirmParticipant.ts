import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import { prisma } from "../lib/prisma";
import { clientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', {
        schema: {
            params: z.object({
                participantId: z.string().uuid()
            })
        },
    }, async (request, reply) => {
        const {participantId} = request.params

        const participant = await prisma.participant.findUnique({
            where: {
                id: participantId
            }
        })

        if (!participant){
            throw new clientError('Participant not found.')
        }

        if (participant.isConfirmed){
            return reply.redirect(`${env.FRONT_URL}/trips/${participant.tripId}`)
        }

        await prisma.participant.update({
            where:{
                id:participantId}, 
            data: {
                isConfirmed: true
            }
        })
        return reply.redirect(`${env.FRONT_URL}/trips/${participant.tripId}`)
    })
}
