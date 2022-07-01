import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { getDate } from '../utils'

export default ({ Groceries }) => {
    return {
        create: async ( res, body ) => {
            try {
                const { name, category, price } = body;
                if (!name && !category && !price) return res.status(httpStatus.BAD_REQUEST).send({ message: 'All input is required' });
    
                const grocery = await Groceries({
                    ...body,
                    _id: mongoose.Types.ObjectId().toString(),
                    createdAt: getDate(),
                    updatedAt: getDate()
                }).save();

                return grocery;
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        getGroceryAll: async (res) => {
            try {
                const allGrocery = await Groceries.find({});
                return allGrocery;
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        getGroceryInfo: async (res, params) => {
            try {
                const { id } = params;
                const groceryInfo = await Groceries.findOne({ _id: id });
                if (!groceryInfo) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Grocery not found' });
                return groceryInfo
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        updateGroceryInfo: async (res, body) => {
            try {
                const { id, name, category, price } = body;
                if (!id && !name && !category && !price) return res.status(httpStatus.BAD_REQUEST).send({ message: 'No record to be changed' });
                await Groceries.findOneAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        updatedAt: getDate()
                    },
                    { new: true }
                )
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        },
        deleteGroceryInfo: async (res, body) => {
            try {
                const { id } = body;
                const grocery = await Groceries.findOne({ _id: id });
                if(!grocery) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Grocery is not existing' });
                await Groceries.deleteOne({ _id: id });
            } catch (error) {
                return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
            }
        }
    }
}
  