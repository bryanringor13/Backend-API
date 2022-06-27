import express from 'express'
import { headers } from '../middlewares/headers'

import { validate } from '../middlewares/validate'
import groceryValidation from '../validations/grocery.validation'

const router = express.Router()

export default ({
  create,
  groceryAll,
  groceryInfo,
  updateInfo,
  deleteInfo
}) => {
  router.route('/create').post(validate(groceryValidation.create), headers, create)
  router.route('/').get(validate(groceryValidation.groceryAll), headers, groceryAll)
  router.route('/:id').get(validate(groceryValidation.groceryInfo), headers, groceryInfo)
  router.route('/:id').patch(validate(groceryValidation.updateInfo), headers, updateInfo)
  router.route('/:id').delete(validate(groceryValidation.deleteInfo), headers, deleteInfo)

  return router
}
