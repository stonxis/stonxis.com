import cors from '@fastify/cors'

export const corsConfig = {
    origin: [
        'http://localhost:5173',
        'https://stonxis.com',
        'https://app.stonxis.com',
        'https://docs.stonxis.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

export const registerCors = (app: any) => {
    app.register(cors, corsConfig)
}