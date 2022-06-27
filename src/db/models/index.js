import Grocery from './grocery'
import User from './user'

export default (conn, options) => {
  const Users = User(conn)
  const Groceries = Grocery(conn)

  return {
    Users,
    Groceries
  }
}
