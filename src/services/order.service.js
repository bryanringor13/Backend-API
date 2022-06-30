import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { getDate } from '../utils'
import ApiError from '../utils/ApiError'
import { catchMongooseError } from '../utils/errorHandling'

export default ({ Orders }) => {
    return {
        create: async ( body ) => {
            try {
                const { groceryId, userId, orderName, price } = body;
                if (!groceryId && !userId && !orderName && !price) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    
                const order = await Orders({
                    ...body,
                    _id: mongoose.Types.ObjectId().toString(),
                    createdAt: getDate(),
                    updatedAt: getDate()
                }).save();

                return order;
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        getOrderInfo: async (body) => {
            const { userId } = body;
            const orderInfo = await Orders.find({ userId }).catch(catchMongooseError);
            if (!orderInfo) throw new ApiError(httpStatus.BAD_REQUEST, 'Order not found')
            return {
                order: [...orderInfo]
            }
        }
    }
}
  