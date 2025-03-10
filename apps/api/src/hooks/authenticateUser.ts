export const authenticateUser = async (req: any, rep: any) => {
    try {
        await req.jwtVerify();
    } catch (err) {
        return rep.status(401).send({
            message: 'Você não tem permissão para acessar essa rota ou o seu token é inválido.',
        });
    }
};