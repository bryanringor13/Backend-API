import express from 'express'
import initUserRoute from './user.route'
import initGroceryRoute from './grocery.route'
import initOrderRoute from './order.route'

export const configureRoutes = ({
  Users
}, {
  UserController,
  GroceryController,
  OrderController
}) => {
  const router = express.Router()
  router.use('', initUserRoute(Users, UserController))
  router.use('/grocery', initGroceryRoute(Users, GroceryController))
  router.use('/order', initOrderRoute(Users, OrderController))

  return { router }
}
