export const authenticateUser = async (req: any, rep: any) => {
    try {
        await req.jwtVerify();
    } catch (err) {
        return rep.status(401).send({
            message: 'Token inválido',
        });
    }
};