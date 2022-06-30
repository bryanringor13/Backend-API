import Grocery from './grocery'
import Order from './order'
import User from './user'

export default (conn, options) => {
  const Users = User(conn)
  const Groceries = Grocery(conn)
  const Orders = Order(conn)

  return {
    Users,
    Groceries,
    Orders
  }
}
