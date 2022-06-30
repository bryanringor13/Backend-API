import mongoose from 'mongoose'
import BaseSchema from './base'
import { extend } from '../../utils/extend'
import connectModel from '../../utils/connectModel'

const { Schema } = mongoose;

const UserSchema = new Schema(
  extend(BaseSchema, {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permissionLevel: {
        type: Number,
        required: true,
        enum: [1,2]
    },
    accessToken: {
        type: String,
        required: true,
        default: '1'
    },
    refreshToken: {
        type: String,
        required: true,
        default: '1'
    }
  }),
  { versionKey: false }
)

const Users = conn => connectModel(conn, UserSchema, 'users')

export default Users
