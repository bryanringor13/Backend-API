import mongoose from 'mongoose';
const { Schema } = mongoose;

const BaseSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
}, { versionKey: false, _id: false })

export default BaseSchema
