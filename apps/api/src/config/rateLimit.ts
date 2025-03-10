import rateLimit from '@fastify/rate-limit'

export const rateLimitConfig = {
    max: 5,
    timeWindow: '1 minute',
    message: 'Você atingiu o limite de requisições. Por favor, tente novamente mais tarde.',
}

export const registerRateLimit = (app: any) => {
    app.register(rateLimit, {
        max: rateLimitConfig.max,
        timeWindow: rateLimitConfig.timeWindow,
        keyGenerator: (req: any) => req.ip,
    })

    app.addHook('onError', (req: any, rep: any, err: any) => {
        if (err.statusCode === 429) {
            rep.status(429).send({
                statusCode: 429,
                message: rateLimitConfig.message
            })
        }
    })
}