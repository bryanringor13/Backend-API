import mongoose from 'mongoose'
import BaseSchema from './base'
import { extend } from '../../utils/extend'
import connectModel from '../../utils/connectModel'

const { Schema } = mongoose;

const GrocerySchema = new Schema(
  extend(BaseSchema, {
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
  }),
  { versionKey: false }
)

const Grocery = conn => connectModel(conn, GrocerySchema, 'groceries')

export default Grocery
