import fastify from 'fastify';
import cors from '@fastify/cors';
import { createTrip } from './routes/createTrip';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip } from './routes/confirmTrip';
import { confirmParticipant } from './routes/confirmParticipant';
import { createActivity } from './routes/createActivity';
import { getActivities } from './routes/getActivities';
import { createLink } from './routes/createLink';
import { getLinks } from './routes/getLinks';
import { getParticipants } from './routes/getParticipants';
import { createInvite } from './routes/createInvite';
import { updateTrip } from './routes/updateTrip';
import { getTripDetails } from './routes/getTripDetails';
import { getParticipant } from './routes/getParticipant';
import { errorHandler } from './error-handler';
import { env } from './env';


const app = fastify()

app.register(cors, {
  origin: `*`,
})

//Configurações
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)
 
//Registro de Rotas
app.register(createTrip)
app.register(confirmTrip)
app.register(updateTrip)
app.register(getTripDetails)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(getParticipant)
app.register(createInvite)

app.listen({ port: env.PORT }).then(() => {
  console.log ("Server Running!")
})