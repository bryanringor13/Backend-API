import express from 'express'
import { headers } from '../middlewares/headers'

import { validate } from '../middlewares/validate'
import userValidation from '../validations/user.validation'

const router = express.Router()

export default (Users, {
  token,
  login,
  userInfo,
  register,
  updateInfo,
  deleteInfo,
  logout
}) => {
  router.route('/token').post(validate(userValidation.token), token)
  router.route('/login').post(validate(userValidation.login), login)
  router.route('/register').put(validate(userValidation.register), register)
  router.route('/userinfo').get(validate(userValidation.userInfo), headers(Users), userInfo)
  router.route('/updateUser').patch(validate(userValidation.updateInfo), headers(Users), updateInfo)
  router.route('/deleteUser').delete(validate(userValidation.deleteInfo), headers(Users), deleteInfo)
  router.route('/logout').post(validate(userValidation.logout), headers(Users), logout)

  return router
}
