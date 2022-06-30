import { catchAsync, pick } from '../utils'

export default ({ UserService }) => {
    const token = catchAsync(async (req, res) => {
        const body = pick(req.body, ['token']);
        const accessToken = await UserService.newToken(body)
        res.send(accessToken)
    })
    const login = catchAsync(async (req, res) => {
        const body = pick(req.body, ['email', 'password']);
        const user = await UserService.login(body)
        res.send(user)
    })
    const userInfo = catchAsync(async (req, res) => {
        const query = { id: res.locals.user_id };
        const info = await UserService.getUserInfo(query)
        res.send(info)
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
    const deleteInfo = catchAsync(async (req, res) => {
        const body = pick(req.body, ['userId']);
        await UserService.deleteUserInfo(body)
        res.json({
            message: "User Deleted!"
        })
    })
    const logout = catchAsync(async (req, res) => {
        const query = { id: res.locals.user_id };
        await UserService.logout(query)
        res.json({
            message: "User Logout!"
        })
    })

    return {
        token,
        login,
        register,
        userInfo,
        updateInfo,
        deleteInfo,
        logout
    }
}
