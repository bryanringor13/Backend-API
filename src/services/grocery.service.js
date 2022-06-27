import httpStatus from 'http-status'
import { v4 as uuidv4 } from 'uuid'
import { getDate } from '../utils'
import ApiError from '../utils/ApiError'
import { catchMongooseError } from '../utils/errorHandling'

export default ({ Groceries }) => {
    // const date = getDate();
    return {
        create: async ( body ) => {
            try {
                const { name, category, price } = body;
                if (!name && !category && !price) throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    
                const grocery = await Groceries({
                    _id: uuidv4(),
                    name,
                    category,
                    price,
                    date: getDate()
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
        updateGroceryInfo: async (params, body) => {
            try {
                const { id } = params;
                const { name, category, price } = body;
                if (!name && !category && !price) throw new ApiError(httpStatus.BAD_REQUEST, 'No record to be changed');
                const updatedInfo = await Groceries.findOneAndUpdate(
                    { _id: id },
                    body,
                    { new: true }
                )

                return updatedInfo;
            } catch (error) {
                return catchMongooseError(error);
            }
        },
        deleteGroceryInfo: async (params) => {
            const { id } = params;
            await Groceries.deleteOne({ _id: id }).catch(catchMongooseError);
        }
    }
}
  