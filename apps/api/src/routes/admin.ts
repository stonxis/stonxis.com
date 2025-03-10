import { FastifyInstance } from "fastify"
import { authenticateAdmin } from "../hooks/authenticateAdmin"

export default async function adminRoute(app: FastifyInstance) {
    app.get('/admin', { preHandler: [authenticateAdmin] }, async (req, rep) => {
        rep.send({
            message: 'Você está autenticado como administrador!'
        })
    })
}