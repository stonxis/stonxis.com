export const authenticateAdmin = async (req: any, rep: any) => {
    try {
        await req.jwtVerify();
        if (req.user.role !== 'ADMIN') {
            return rep.status(401).send({
                message: 'Você não tem permissão para acessar essa rota.'
            });
        }
    } catch (err) {
        return rep.status(401).send({
            message: 'Token inválido'
        });
    }
};