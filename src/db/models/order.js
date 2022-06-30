import mongoose from 'mongoose'
import BaseSchema from './base'
import { extend } from '../../utils/extend'
import connectModel from '../../utils/connectModel'

const { Schema } = mongoose;

const OrderSchema = new Schema(
  extend(BaseSchema, {
    groceryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
  }),
  { versionKey: false }
)

const Order = conn => connectModel(conn, OrderSchema, 'orders')

export default Order
