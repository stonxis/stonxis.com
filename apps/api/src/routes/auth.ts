import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function authRoutes(app: FastifyInstance) {
    app.post('/register', async (req, rep) => {
        const { name, email, password } = req.body as { name: string, email: string, password: string }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userExists) {
            return rep.code(400).send({
                message: 'Este email já foi cadastrado.'
            })
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        rep.code(201).send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            message: 'Usuário criado com sucesso!'
        })

    })

    app.post('/login', async (req, rep) => {
        const { email, password } = req.body as { email: string, password: string }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return rep.code(400).send({
                message: 'Email ou senha inválidos.'
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return rep.code(400).send({
                message: 'Email ou senha inválidos.'
            })
        }
        const token = app.jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        },
            { expiresIn: '1d' }
        )

        rep.setCookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400
        })

        rep.code(200).send({
            token,
            message: 'Login realizado com sucesso.'
        })
    })

    app.get('/profile', { preHandler: [app.authenticateUser] }, async (req, rep) => {
        rep.send(req.user)
    })

    app.get('/logout', async (req, rep) => {
        rep.clearCookie('token')
        rep.send({
            message: 'Logout realizado com sucesso.'
        })
    })

    app.post('/refresh-token', { preHandler: [app.authenticateUser] }, async (req, rep) => {
        const user = req.user as { id: string; name: string; email: string }
        const token = app.jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        },
            { expiresIn: '1d' }
        )
        rep.setCookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400
        })
        rep.send({
            token,
            message: 'Token atualizado com sucesso.'
        })
    })

}
