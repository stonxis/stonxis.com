import { prisma } from "../lib/prisma";

export const authenticateAdmin = async (req: any, rep: any) => {
    try {
        await req.jwtVerify();

        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return rep.status(401).send({
                message: 'Usuário não encontrado'
            });
        }
        
        if (user.role !== 'ADMIN') {
            return rep.status(401).send({
                message: 'Você não tem permissão para acessar essa rota.',
                role: req.user.role
            });
        }

    } catch (err) {
        return rep.status(401).send({
            message: 'Token inválido'
        });
    }
};