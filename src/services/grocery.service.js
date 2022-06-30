import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { getDate } from '../utils'
import ApiError from '../utils/ApiError'
import { catchMongooseError } from '../utils/errorHandling'

export default ({ Groceries }) => {
    return {
        create: async ( body ) => {
            try {
                const { name, category, price } = body;
                if (!name && !category && !price) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    
                const grocery = await Groceries({
                    ...body,
                    _id: mongoose.Types.ObjectId().toString(),
                    createdAt: getDate(),
                    updatedAt: getDate()
                }).save();

                return grocery;
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        getGroceryAll: async () => {
            const allGrocery = await Groceries.find({}).catch(catchMongooseError);
            return allGrocery;
        },
        getGroceryInfo: async (params) => {
            const { id } = params;
            const groceryInfo = await Groceries.findOne({ _id: id }).catch(catchMongooseError);
            if (!groceryInfo) throw new ApiError(httpStatus.BAD_REQUEST, 'Grocery not found')
            return groceryInfo
        },
        updateGroceryInfo: async (body) => {
            try {
                const { id, name, category, price } = body;
                if (!id && !name && !category && !price) throw new ApiError(httpStatus.BAD_REQUEST, 'No record to be changed');
                await Groceries.findOneAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        updatedAt: getDate()
                    },
                    { new: true }
                )
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        deleteGroceryInfo: async (body) => {
            const { id } = body;
            const grocery = await Groceries.findOne({ _id: id }).catch(catchMongooseError);
            if(!grocery) throw new ApiError(httpStatus.BAD_REQUEST, 'Grocery is not existing');
            await Groceries.deleteOne({ _id: id }).catch(catchMongooseError);
        }
    }
}
  