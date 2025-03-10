export const authenticateUser = async (req: any, rep: any) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return rep.status(401).send({
                message: 'Token não encontrado. Por favor, faça login.',
            });
        }
        
        await req.jwtVerify();
    } catch (err) {
        return rep.status(401).send({
            message: 'Token inválido',
        });
    }
};