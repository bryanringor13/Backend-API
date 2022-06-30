import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import ApiError from '../utils/ApiError'
import { catchMongooseError } from '../utils/errorHandling'
import { logoutToken, refToken, token as UTILToken, verifyRefreshToken } from '../utils/tokenHandling'
import { getDate } from '../utils'

export default ({ Users }) => {
    return {
        newToken: async ( body ) => {
            try {
                const { token } = body;
                if (!token) throw new ApiError(httpStatus.BAD_REQUEST, 'Token is required');
    
                const verified = verifyRefreshToken(token)
                if(verified) {
                    const email = verified.email;
                    const user = await Users.findOne({ email }).catch(catchMongooseError);
                    if(!user) throw new ApiError(httpStatus.BAD_REQUEST, 'User is no longer exist');
                    const { _id } = user.toObject();
                    const accessToken = UTILToken(user);

                    await Users.findOneAndUpdate({ _id },{
                            accessToken,
                            updatedAt: getDate()
                        })
                    return { accessToken };
                };
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        login: async ( body ) => {
            try {
                const { email, password } = body;
                if (!email && !password) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
                const user = await Users.findOne({ email }).catch(catchMongooseError);
                
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
                
                throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user credentials');
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        register: async ( body ) => {
            try {
                const { firstName, lastName, email, password, permissionLevel } = body;
                if (!firstName && !lastName && !email && !password && !permissionLevel) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    
                const oldUser = await Users.findOne({ email });
    
                if (oldUser) throw new ApiError(httpStatus.CONFLICT, 'Email already exists');
    
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
                return catchMongooseError(error);
            }
        },
        getUserInfo: async (query) => {
            const { id } = query;
            const userInfo = await Users.findOne({ _id: id }).catch(catchMongooseError);
            if (!userInfo) throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
            return userInfo
        },
        updateUserInfo: async (query, body) => {
            try {
                const { id } = query;
                const { firstName, lastName, password } = body;
                if (!firstName && !lastName && !password) throw new ApiError(httpStatus.BAD_REQUEST, 'No record to be changed');
                if(password) body.password = await bcrypt.hash(password, 10);
                const updatedInfo = await Users.findOneAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        updatedAt: getDate()
                    },
                    { new: true }
                )

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
                return catchMongooseError(error);
            }
        },
        deleteUserInfo: async (body) => {
            try {
                const { userId } = body;
                const user = await Users.findOne({ _id: userId });
                if(!user) throw new ApiError(httpStatus.BAD_REQUEST, 'No record found');
                if (user.permissionLevel === 1) throw new ApiError(httpStatus.BAD_REQUEST, 'Admin user is not allowed to remove their account');
                await Users.deleteOne({ _id: userId });
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        logout: async (query) => {
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
                
            }
        }
    }
}
  