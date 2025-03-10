import fastify from "fastify";

export const app = fastify({
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