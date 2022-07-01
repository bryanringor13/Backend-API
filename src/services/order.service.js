import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { getDate } from '../utils'

export default ({ Orders }) => {
    return {
        create: async ( res, body ) => {
            try {
                const { groceryId, userId, orderName, price } = body;
                if (!groceryId && !userId && !orderName && !price) return res.status(httpStatus.BAD_REQUEST).send({ message: 'All input is required' })
    
                const order = await Orders({
                    ...body,
                    _id: mongoose.Types.ObjectId().toString(),
                    createdAt: getDate(),
                    updatedAt: getDate()
                }).save();

                return order;
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        getOrderInfo: async (res, body) => {
            try {
                const { userId } = body;
                const orderInfo = await Orders.find({ userId });
                if (!orderInfo) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Order not found' });
                return {
                    order: [...orderInfo]
                }
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        }
    }
}
  