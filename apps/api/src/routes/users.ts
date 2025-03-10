import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'

export default async function userRoutes(app: FastifyInstance) {
    app.get('/users', async (req, rep) => {
        const { id, name, email, createdAt } = req.query as {
             id?: string, 
             name?: string, 
             email?: string, 
             createdAt?: Date, 
            }

        const users = await prisma.user.findMany({
            where: {
                id,
                name,
                email,
                createdAt,
            }
        })
        rep.status(200).send(users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })))
    })

    app.post('/users', async (req, rep) => {
        const { name, email, password } = req.body as { name: string, email: string, password: string }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userExists) {
            return rep.code(400).send({
                message: 'Email já cadastrado.'
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
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    })

    app.get('/users/:id', async (req, rep) => {
        const { id } = req.params as { id: string }
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            return rep.code(404).send({
                message: 'Usuário não encontrado.'
            })
        }
        rep.code(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    })

    app.put('/users/:id', async (req, rep) => {
        const { id } = req.params as { id: string };
        const { name, email, password } = req.body as { name: string, email: string, password: string };
    
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
    
        const userExists = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    
        if (!userExists) {
            return rep.code(404).send({
                message: 'Usuário não encontrado.'
            });
        }
    
        if (email && email !== userExists.email) {
            const emailExists = await prisma.user.findUnique({
                where: {
                    email
                }
            });
    
            if (emailExists) {
                return rep.code(400).send({
                    message: 'O email fornecido já está em uso por outro usuário.'
                });
            }
        }
    
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
    
        rep.code(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    });

    app.delete('/users/:id', async (req, rep) => {
        const { id } = req.params as { id: string }
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        rep.code(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        })
    })

}