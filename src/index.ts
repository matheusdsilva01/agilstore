import fastify from 'fastify'
import cors, { FastifyCorsOptions } from '@fastify/cors'
import dotenv from 'dotenv'
import { productRoutes } from 'routes'

const server = fastify()

const corsOptions: FastifyCorsOptions = {
    credentials: true,
    origin: '*'
}

server.register(cors, corsOptions)

server.register(productRoutes, {
    prefix: '/products'
})

server.get('/', (_, res) => {
    res.send({ message: 'Hello World' })
})


server.listen({
    port: 8080,
    host: process.env.HOST || '0.0.0.0'
}, () => {
    console.log('Server listening at port 8080') 
    dotenv.config()
})