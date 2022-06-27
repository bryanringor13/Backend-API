import config from '../config'
import jwt from 'jsonwebtoken'

const token = ({ _id, email }) => jwt.sign({ 
    user_id: _id, 
    email: email 
}, config.tokenKey, {
    expiresIn: config.tokenXpry,
});

const verifyToken = (token) => jwt.verify(token, config.tokenKey)

export {
    token,
    verifyToken
}