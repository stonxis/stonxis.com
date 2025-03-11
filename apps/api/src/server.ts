import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import { app } from "./lib/fastify";
import { registerRateLimit } from "./config/rateLimit";
import { addHeaders } from "./config/headers";
import { registerCors } from "./config/cors";
import { registerJwt } from "./config/jwt";
import { authenticateAdmin } from "./hooks/authenticateAdmin";
import { authenticateUser } from "./hooks/authenticateUser";
import adminRoute from "./routes/admin";
import { registerCookies } from "./config/cookies";

console.log("Configurando serviços...");

registerRateLimit(app);
console.log("Rate Limit configurado");

registerCors(app);
console.log("CORS configurado");

registerJwt(app);
console.log("JWT configurado");

registerCookies(app);
console.log("Cookies configurados");

app.addHook("onSend", addHeaders);

app.decorate("authenticateAdmin", authenticateAdmin);
app.decorate("authenticateUser", authenticateUser);

app.register(authRoutes);
app.register(userRoutes);
app.register(adminRoute);

app.get("/", async () => {
    return { message: "Stonxis API" };
});

// Função para iniciar o servidor
const start = async () => {
    try {
        const port = 3333;
        const host = "0.0.0.0";

        console.log(`Iniciando servidor em http://${host}:${port}`);
        await app.listen({ port, host });

        app.log.info(`Servidor rodando em http://${host}:${port}`);
    } catch (err) {
        app.log.error("Erro ao iniciar o servidor:", err);
        process.exit(1);
    }
};

start();
