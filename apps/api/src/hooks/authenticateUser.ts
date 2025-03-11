import { prisma } from "../lib/prisma";

export const authenticateUser = async (req: any, rep: any) => {
    try {
        await req.jwtVerify();

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true }
        });

        if (!user) {
            return rep.status(401).send({ message: "Usuário não encontrado." });
        }

    } catch (err) {
        return rep.status(401).send({ message: "Token inválido." });
    }
};
