import initUserController from './user.controller'
import initGroceryController from './grocery.controller'

export const configureControllers = ({
    UserService,
    GroceryService,
}) => {
  const UserController = initUserController({ UserService })
  const GroceryController = initGroceryController({ GroceryService })

  return {
    UserController,
    GroceryController
  }
}
