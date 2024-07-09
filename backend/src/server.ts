import fastify from 'fastify';
import cors from '@fastify/cors'
import { prisma } from './lib/prisma';
import { createTrip } from './routes/createTrip';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip } from './routes/confirmTrip';
import { confirmParticipant } from './routes/confirmParticipant';

const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)

app.listen({ port: 3333 }).then(() => {
  console.log ("Server Running!")
})