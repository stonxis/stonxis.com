import jwt from "@fastify/jwt";
import Fastify from "fastify";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import rateLimit from "@fastify/rate-limit";
import cors from '@fastify/cors'

const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'SYS:standard',
                colorize: true,
                ignore: 'pid,hostname',
                level: 'info'
            }
        }
    }
})

app.register(rateLimit, {
    max: 5,
    timeWindow: '1 minute'
})

app.register(cors, {
    origin: [
        'https://stonxis.com',
        'https://app.stonxis.com',
        'https://docs.stonxis.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

app.register(jwt, {
    secret: process.env.JWT_SECRET ?? 'secret',
})

app.decorate('authenticate', async (req: any, rep: any) => {
    try {
        await req.jwtVerify()
    } catch (err) {
        return rep.status(401).send({
            message: 'Token inválido'
        })
    }
})

app.register(authRoutes)
app.register(userRoutes)

app.get('/', async () => {
    return {
        message: 'Stonxis API'
    }
})

const start = async () => {
    try {
        const port = 3333
        const host = '0.0.0.0'
        await app.listen({
            port,
            host
        })
        app.log.info(`Server listening at http://${host}:${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()