import express from 'express'
import { headers } from '../middlewares/headers'

import { validate } from '../middlewares/validate'
import userValidation from '../validations/user.validation'

const router = express.Router()

export default ({
  login,
  userInfo,
  register,
  updateInfo
}) => {
  router.route('/login').post(validate(userValidation.login), login)
  router.route('/register').post(validate(userValidation.register), register)
  router.route('/userinfo').get(validate(userValidation.userInfo), headers, userInfo)
  router.route('/update').patch(validate(userValidation.updateInfo), headers, updateInfo)

  return router
}
