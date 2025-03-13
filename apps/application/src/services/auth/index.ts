import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../database";
import { Resend } from "resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { MagicLinkEmail } from "../../../../emails";

const resendApiKey = process.env.RESEND_API_KEY;
// Instead of throwing an error immediately, we'll initialize Resend only if the API key exists
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const port = process.env.EMAIL_SERVER_PORT ? Number(process.env.EMAIL_SERVER_PORT) : undefined

export const {
    handlers: { GET, POST},
    auth,
} = NextAuth({
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
        verifyRequest: "/login",
        newUser: "/"
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: port,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({ identifier, url }) {
                if (!resendApiKey) {
                    throw new Error("API key is missing");
                }
                
                if (!resend) {
                    throw new Error("Resend client is not initialized");
                }
                
                try {
                    await resend.emails.send({
                        from: 'Stonxis <noreply@stonxis.com>',
                        to: identifier,
                        subject: "Pegue seu link de acesso",
                        react: MagicLinkEmail({ url }),
                    });

                } catch (err) {
                    console.error("Erro ao enviar o e-mail:", err);
                }
            }
        }),
    ]
});
