import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../database";
import { Resend } from "resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { MagicLinkEmail } from "../../../../emails";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

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
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                domain: process.env.NODE_ENV === "production" ? ".stonxis.com" : undefined,
            },
        },
        callbackUrl: {
            name: 'next-auth.callback-url',
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
                    return;
                }
                
                if (!resend) {
                    console.error("Resend client is not initialized. Please check your environment variables.");
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
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile"
                }
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                }
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google' || account?.provider === 'facebook') {
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: user.email,
                    },
                    include: {
                        accounts: true,
                    },
                });

                if (existingUser && !existingUser.accounts.some(acc => acc.provider === account.provider)) {
                    await prisma.account.create({
                        data: {
                            userId: existingUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                        },
                    });
                }
            }
            return true;
        },
        async redirect({ baseUrl }) {
            return baseUrl;
        },
        async jwt({ token, account, user }) {
            if (account && user) {
                token.accessToken = account.access_token;
                token.userId = user.id;
                if (account.provider === 'google' || account.provider === 'facebook') {
                    token.provider = account.provider;
                    token.id_token = account.id_token;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.userId as string;
                (session as any).accessToken = token.accessToken;
                if (token.provider === 'google' || token.provider === 'facebook') {
                    (session as any).provider = token.provider;
                    (session as any).id_token = token.id_token;
                }
            }
            return session;
        }
    }
});
