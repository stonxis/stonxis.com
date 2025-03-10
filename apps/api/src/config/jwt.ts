import fastifyJwt from "@fastify/jwt"

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'secret',
}

export const registerJwt = (app: any) => {
    app.register(fastifyJwt, {
        secret: jwtConfig.secret,
        sign: {
            expiresIn: '1d'
        }
    })
}