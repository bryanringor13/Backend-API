import httpStatus from 'http-status'
import ApiError from '../utils/ApiError'
import { verifyToken } from '../utils/tokenHandling'

export const headers = (req, res, next) => {
    const bearerHeader = req.get('authorization')
    if(bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const verified = verifyToken(bearerToken)
            if(verified) {
                res.locals.user_id = verified.user_id;
                return next();
            };
        } catch (error) {
            console.log(error)
            next(new ApiError(httpStatus.FORBIDDEN, 'Not authorized'));
        }
    }
    
    return next(new ApiError(httpStatus.FORBIDDEN, 'Authorization is required'));
}