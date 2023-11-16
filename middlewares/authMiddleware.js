import JWT from 'jsonwebtoken';

const requireSignin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = await JWT.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.send(401).send({
                success: false,
                message: 'Unathorized access',
                error
            })
        }
        req.user=decode;
        next();
    }
    catch (error) {
        console.error(error);
        return res.send(401).send({
            success: false,
            message: 'Unathorized access',
            error
        })
    }
}