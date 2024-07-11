import { FastifyInstance } from "fastify"
import { clientError } from "./errors/client-error"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler : FastifyErrorHandler = (error, request, response) =>{
    console.log (error)
    if (error instanceof ZodError){
        return response.status(400).send ({
            message: "Validation error",
            issues: error.flatten().fieldErrors
        })
    }
    if (error instanceof clientError){
        return response.status(400).send({message: error.message})
    }

    return response.status(500).send({ message: 'Internal server error' })
}  