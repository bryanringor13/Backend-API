import { catchAsync, pick } from '../utils'

export default ({ GroceryService }) => {
    const create = catchAsync(async (req, res) => {
        const body = pick(req.body, ['name', 'category', 'price']);
        const token = await GroceryService.create(body)
        res.send(token)
    })
    const groceryAll = catchAsync(async (req, res) => {
        const groceryAll = await GroceryService.getGroceryAll()
        res.send(groceryAll)
    })
    const groceryInfo = catchAsync(async (req, res) => {
        const params = pick(req.params, ['id']);
        const user = await GroceryService.getGroceryInfo(params)
        res.send(user);
    })
    const updateInfo = catchAsync(async (req, res) => {
        const params = pick(req.params, ['id']);
        const body = pick(req.body, ['name','category','price']);
        const updatedInfo = await GroceryService.updateGroceryInfo(params, body)
        res.send(updatedInfo)
    })
    const deleteInfo = catchAsync(async (req, res) => {
        const params = pick(req.params, ['id']);
        await GroceryService.deleteGroceryInfo(params)
        res.send('ok')
    })

    return {
        create,
        groceryAll,
        groceryInfo,
        updateInfo,
        deleteInfo
    }
}
