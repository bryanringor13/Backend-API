import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../utils/ApiError'
import { catchMongooseError } from '../utils/errorHandling'
import { token } from '../utils/tokenHandling'
import { getDate } from '../utils'

export default ({ Users }) => {
    // const date = getDate();
    return {
        login: async ( body ) => {
            const { email, password } = body;
            if (!email && !password) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
            const user = await Users.findOne({ email }).catch(catchMongooseError);
            
            if(user && (await bcrypt.compare(password, user.password))) {
                const response = user.toObject();
                response.token = token(user);
                delete response.password;

                return response;
            }

            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user credentials');
        },
        register: async ( body ) => {
            try {
                const { firstName, lastName, email, password, permissionLevel } = body;
                if (!firstName && !lastName && !email && !password && !permissionLevel) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    
                const oldUser = await Users.findOne({ email });
    
                if (oldUser) throw new ApiError(httpStatus.CONFLICT, 'User already exist');
    
                const encryptedPassword = await bcrypt.hash(password, 10);
    
                const user = await Users({
                    _id: uuidv4(),
                    firstName,
                    lastName,
                    email,
                    password: encryptedPassword,
                    permissionLevel,
                    date: getDate()
                }).save();
                
                const response = user.toObject();
                response.token = token(user);
                delete response.password;
    
                return response;
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
                    body,
                    { new: true }
                )

                const response = updatedInfo.toObject();
                delete response.password;

                return response;
            } catch (error) {
                return catchMongooseError(error);
            }
        }
    }
}
  