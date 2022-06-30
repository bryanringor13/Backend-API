import config from '../config'
import jwt from 'jsonwebtoken'

const token = ({ _id, email }) => jwt.sign({ 
    user_id: _id, 
    email 
}, config.tokenKey, {
    expiresIn: config.tokenXpry,
});

const refToken = ({ _id, email }) => jwt.sign({ 
    user_id: _id, 
    email 
}, config.refreshTokenKey, {
    expiresIn: config.refreshTokenXpry,
})

// const logoutToken = ({ user_id, email}) => jwt.sign({ 
//     user_id, 
//     email 
// }, config.tokenKey, {
//     expiresIn: 1,
// })

const verifyToken = (token) => jwt.verify(token, config.tokenKey)
const verifyRefreshToken = (token) => jwt.verify(token, config.refreshTokenKey)
const logoutToken = (token) => jwt.verify(token, config.tokenKey, {
    maxAge: 1
})

export {
    token,
    verifyToken,
    refToken,
    verifyRefreshToken,
    logoutToken
}