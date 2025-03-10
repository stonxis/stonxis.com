import rateLimit from '@fastify/rate-limit'

export const rateLimitConfig = {
    max: 5,
    timeWindow: '1 minute'
}

export const registerRateLimit = (app: any) => {
    app.register(rateLimit, {
        max: rateLimitConfig.max,
        timeWindow: rateLimitConfig.timeWindow
    })
}