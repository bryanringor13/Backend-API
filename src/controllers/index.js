import initUserController from './user.controller'
import initGroceryController from './grocery.controller'
import initOrderController from './order.controller'

export const configureControllers = ({
    UserService,
    GroceryService,
    OrderService
}) => {
  const UserController = initUserController({ UserService })
  const GroceryController = initGroceryController({ GroceryService })
  const OrderController = initOrderController({ OrderService })

  return {
    UserController,
    GroceryController,
    OrderController
  }
}
