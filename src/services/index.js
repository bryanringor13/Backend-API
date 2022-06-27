import initUserService from './user.service'
import initGroceryService from './grocery.service'

export const configureServices = ({
  Users,
  Groceries
}) => {
  const UserService = initUserService({ Users })
  const GroceryService = initGroceryService({ Groceries })

  return {
    UserService,
    GroceryService
  }
}
