import express from 'express'
import { headers } from '../middlewares/headers'

import { validate } from '../middlewares/validate'
import groceryValidation from '../validations/grocery.validation'

const router = express.Router()

export default (Users, {
  create,
  groceryAll,
  groceryInfo,
  updateInfo,
  deleteInfo
}) => {
  router.route('/').put(validate(groceryValidation.create), headers(Users), create)
  router.route('/').get(validate(groceryValidation.groceryAll), headers(Users), groceryAll)
  router.route('/:id').get(validate(groceryValidation.groceryInfo), headers(Users), groceryInfo)
  router.route('/').patch(validate(groceryValidation.updateInfo), headers(Users), updateInfo)
  router.route('/').delete(validate(groceryValidation.deleteInfo), headers(Users), deleteInfo)

  return router
}
