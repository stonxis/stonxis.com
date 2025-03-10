import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import { app } from "./lib/fastify";
import { registerRateLimit } from "./config/rateLimit";
import { addHeaders } from "./config/headers";
import { registerCors } from "./config/cors";
import { registerJwt } from "./config/jwt";
import { authenticateAdmin } from "./hooks/authenticateAdmin";
import { authenticateUser } from "./hooks/authenticateUser";

registerRateLimit(app)
registerCors(app)
registerJwt(app)

app.addHook('onSend', addHeaders)

app.decorate('authenticateAdmin', authenticateAdmin)
app.decorate('authenticateUser', authenticateUser)

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