import httpStatus from 'http-status'
import { verifyToken } from '../utils/tokenHandling'

export const headers = (Users) => async (req, res, next) => {
    const bearerHeader = req.get('authorization')
    if(bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const verified = verifyToken(bearerToken)
            if(verified) {
                const { user_id, email } = verified;
                res.locals.user_id = user_id;
                res.locals.email = email;
                res.locals.token = bearerToken;

                const response = await Users.findOne({ _id: user_id, accessToken: bearerToken })
                if(!response) return res.status(httpStatus.FORBIDDEN).send({ message: 'Not authorized' });

                return next();
            };
        } catch (error) {
            return res.status(httpStatus.FORBIDDEN).send({ message: error.message });
        }
    }
    
    return res.status(httpStatus.FORBIDDEN).send({ message: 'Authorization is required' });
}