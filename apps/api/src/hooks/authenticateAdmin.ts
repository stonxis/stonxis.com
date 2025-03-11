import { prisma } from "../lib/prisma";

export const authenticateAdmin = async (req: any, rep: any) => {
    try {
        await req.jwtVerify();

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, role: true }
        });

        if (!user) {
            return rep.status(401).send({ message: "Usuário não encontrado." });
        }

        if (user.role !== "ADMIN") {
            return rep.status(403).send({ message: "Acesso negado." });
        }

    } catch (err) {
        return rep.status(401).send({ message: "Token inválido." });
    }
};
