import initUserService from './user.service'
import initGroceryService from './grocery.service'
import initOrderService from './order.service'

export const configureServices = ({
  Users,
  Groceries,
  Orders
}) => {
  const UserService = initUserService({ Users })
  const GroceryService = initGroceryService({ Groceries })
  const OrderService = initOrderService({ Orders })

  return {
    UserService,
    GroceryService,
    OrderService
  }
}
