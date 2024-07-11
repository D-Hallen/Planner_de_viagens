import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"; //integração do ZOD com o fastify
import { z } from 'zod'; //biblioteca do ZOD para validação de dados
import { prisma } from '../lib/prisma';
import { clientError } from "../errors/client-error";

export async function getParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/participants/:participantId', {
        schema: {
            params: z.object({
              participantId: z.string().uuid() 
            }),
        },
    }, async (request) => {
        const { participantId } = request.params
        const participant = await prisma.participant.findUnique({           
            select: {
                id: true,
                name: true,
                email: true,
                isConfirmed: true
            },
            where:{
                id: participantId
            }
        })
        if (!participant){
            throw new clientError ('Participant not found.')
        }

        return ({ participant })
    })
}
