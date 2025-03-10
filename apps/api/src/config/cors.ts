import cors from '@fastify/cors'

export const corsConfig = {
    origin: [
        'https://stonxis.com',
        'https://app.stonxis.com',
        'https://docs.stonxis.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

export const registerCors = (app: any) => {
    app.register(cors, corsConfig)
}