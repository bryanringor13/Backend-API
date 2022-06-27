import { catchAsync, pick } from '../utils'

export default ({ UserService }) => {
    const login = catchAsync(async (req, res) => {
        const body = pick(req.body, ['email', 'password']);
        const token = await UserService.login(body)
        res.send(token)
    })
    const userInfo = catchAsync(async (req, res) => {
        const query = { id: res.locals.user_id };
        const userInfo = await UserService.getUserInfo(query)
        res.send(userInfo)
    })
    const register = catchAsync(async (req, res) => {
        const body = pick(req.body, ['firstName', 'lastName', 'email', 'password', 'permissionLevel']);
        const user = await UserService.register(body)
        res.send(user);
    })
    const updateInfo = catchAsync(async (req, res) => {
        const query = { id: res.locals.user_id };
        const body = pick(req.body, ['firstName','lastName','password']);
        const updatedInfo = await UserService.updateUserInfo(query, body)
        res.send(updatedInfo)
    })

    return {
        login,
        register,
        userInfo,
        updateInfo
    }
}
