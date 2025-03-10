import fastifyCookie from "@fastify/cookie";

export const registerCookies = (app: any) => {
    app.register(fastifyCookie)
}