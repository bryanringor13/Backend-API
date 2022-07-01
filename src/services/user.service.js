import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { refToken, token as UTILToken, verifyRefreshToken } from '../utils/tokenHandling'
import { getDate } from '../utils'

export default ({ Users }) => {
    return {
        newToken: async ( res, body ) => {
            try {
                const { token } = body;
                if (!token) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Token is required' })
    
                const verified = verifyRefreshToken(token)
                if(verified) {
                    const email = verified.email;
                    const user = await Users.findOne({ email });
                    if(!user) return res.status(httpStatus.BAD_REQUEST).send({ message: 'User is no longer exist' });
                    const { _id } = user.toObject();
                    const accessToken = UTILToken(user);

                    await Users.findOneAndUpdate({ _id },{
                            accessToken,
                            updatedAt: getDate()
                        })
                    return { accessToken };
                };
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        login: async ( res, body ) => {
            try {
                const { email, password } = body;
                if (!email && !password) return res.status(httpStatus.BAD_REQUEST).send({ message: 'All input is required' })
                const user = await Users.findOne({ email })
                
                if(user && (await bcrypt.compare(password, user.password))) {
                    const { permissionLevel, _id, firstName, lastName } = user.toObject();
                    const accessToken = UTILToken(user);
                    const refreshToken = refToken(user);

                    await Users.findOneAndUpdate({ _id },{
                            accessToken,
                            refreshToken,
                            updatedAt: getDate()
                        })
    
                    return {
                        accessToken,
                        refreshToken,
                        name: `${firstName} ${lastName}`,
                        userId: _id,
                        permissionLevel
                    };
                }
                return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid user credentials' })
            } catch (error) {
                 return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        register: async ( res, body ) => {
            try {
                const { firstName, lastName, email, password, permissionLevel } = body;
                if (!firstName && !lastName && !email && !password && !permissionLevel) return res.status(httpStatus.BAD_REQUEST).send({ message: 'All input is required' })
    
                const oldUser = await Users.findOne({ email });
    
                if (oldUser) return res.status(httpStatus.CONFLICT).send({ message: 'Email already exists' })
    
                const encryptedPassword = await bcrypt.hash(password, 10);
    
                const user = await Users({
                    _id: mongoose.Types.ObjectId().toString(),
                    firstName,
                    lastName,
                    email,
                    password: encryptedPassword,
                    permissionLevel,
                    createdAt: getDate(),
                    updatedAt: getDate()
                }).save();
                
                const response = user.toObject();
                delete response.password;
                delete response.accessToken;
                delete response.refreshToken;
                
                return {
                    message: "User Created!",
                    user: {
                        ...response
                    }
                };
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        getUserInfo: async (res, query) => {
            try {
                const { id } = query;
                const userInfo = await Users.findOne({ _id: id })
                if (!userInfo) return res.status(httpStatus.BAD_REQUEST).send({ message: 'User not found' });
                return userInfo
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        updateUserInfo: async (res, query, body) => {
            try {
                const { id } = query;
                const { firstName, lastName, password } = body;
                if (!firstName && !lastName && !password) return res.status(httpStatus.BAD_REQUEST).send({ message: 'No record to be changed' }); 
                if(password) body.password = await bcrypt.hash(password, 10);
                const updatedInfo = await Users.findOneAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        updatedAt: getDate()
                    },
                    { new: true }
                );

                const response = updatedInfo.toObject();
                delete response.password;
                delete response.accessToken;
                delete response.refreshToken;

                return {
                    message: "User Updated!",
                    userUpdated: {
                        ...response
                    }
                };
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        deleteUserInfo: async (res, body) => {
            try {
                const { userId } = body;
                const user = await Users.findOne({ _id: userId });
                if(!user) return res.status(httpStatus.BAD_REQUEST).send({ message: 'No record found' });
                if (user.permissionLevel === 1) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Admin user is not allowed to remove their account'});
                await Users.deleteOne({ _id: userId });
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        logout: async (res, query) => {
            try {
                const { id } = query;
                const accessToken = '1';
                const refreshToken = '1';

                await Users.findOneAndUpdate({ _id: id },{
                    accessToken,
                    refreshToken,
                    updatedAt: getDate()
                })
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        }
    }
}
  