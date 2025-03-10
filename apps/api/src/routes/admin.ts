import { FastifyInstance } from "fastify"

export default async function adminRoute(app: FastifyInstance) {
    app.get('/admin', { preHandler: [app.authenticateAdmin] }, async (req, rep) => {
        rep.send(req.user)
    })
}