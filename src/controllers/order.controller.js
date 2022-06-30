import { catchAsync, pick } from '../utils'

export default ({ OrderService }) => {
    const create = catchAsync(async (req, res) => {
        const body = pick(req.body, ['groceryId','userId', 'orderName', 'price']);
        const token = await OrderService.create(body)
        res.send(token)
    })
    const orderInfo = catchAsync(async (req, res) => {
        const body = pick(req.body, ['userId']);
        const order = await OrderService.getOrderInfo(body)
        res.send(order);
    })

    return {
        create,
        orderInfo
    }
}
