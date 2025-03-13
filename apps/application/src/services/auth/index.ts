import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../database";
import { Resend } from "resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { MagicLinkEmail } from "../../../../emails";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const port = process.env.EMAIL_SERVER_PORT ? Number(process.env.EMAIL_SERVER_PORT) : undefined

export const {
    handlers: { GET, POST},
    auth,
} = NextAuth({
    trustHost: true,
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
        verifyRequest: "/login",
        newUser: "/"
    },
    adapter: PrismaAdapter(prisma),
    cookies: {
        sessionToken: {
            name: `authjs.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                domain: process.env.NODE_ENV === "production" ? ".stonxis.com" : undefined,
            },
        },
    },
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
                    console.error("RESEND_API_KEY is missing. Please add it to your environment variables.");
                    // Instead of throwing an error, we'll return early with a log message
                    return;
                }
                
                if (!resend) {
                    console.error("Resend client is not initialized. Please check your environment variables.");
                    // Instead of throwing an error, we'll return early with a log message
                    return;
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
