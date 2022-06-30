import express from 'express'
import { headers } from '../middlewares/headers'

import { validate } from '../middlewares/validate'
import orderValidation from '../validations/order.validation'

const router = express.Router()

export default (Users, {
  create,
  orderInfo
}) => {
  router.route('/').put(validate(orderValidation.create), headers(Users), create)
  router.route('/').get(validate(orderValidation.orderInfo), headers(Users), orderInfo)

  return router
}
