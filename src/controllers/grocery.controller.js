import { catchAsync, pick } from '../utils'

export default ({ GroceryService }) => {
    const create = catchAsync(async (req, res) => {
        const body = pick(req.body, ['name', 'category', 'price']);
        const grocery = await GroceryService.create(body)
        res.send(grocery)
    })
    const groceryAll = catchAsync(async (req, res) => {
        const groceryAll = await GroceryService.getGroceryAll()
        res.send(groceryAll)
    })
    const groceryInfo = catchAsync(async (req, res) => {
        const params = pick(req.params, ['id']);
        const grocery = await GroceryService.getGroceryInfo(params)
        res.send(grocery);
    })
    const updateInfo = catchAsync(async (req, res) => {
        const body = pick(req.body, ['id','name','category','price']);
        await GroceryService.updateGroceryInfo(body)
        res.json({
            message: "Grocery Info Updated!"
        })
    })
    const deleteInfo = catchAsync(async (req, res) => {
        const body = pick(req.body, ['id']);
        await GroceryService.deleteGroceryInfo(body)
        res.json({
            message: "Grocery Deleted!"
        })
    })

    return {
        create,
        groceryAll,
        groceryInfo,
        updateInfo,
        deleteInfo
    }
}
