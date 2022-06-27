import express from 'express'
import initUserRoute from './user.route'
import initGroceryRoute from './grocery.route'

export const configureRoutes = (deps, {
  UserController,
  GroceryController
}) => {
  const router = express.Router()
  router.use('/user', initUserRoute(UserController))
  router.use('/grocery', initGroceryRoute(GroceryController))

  return { router }
}
