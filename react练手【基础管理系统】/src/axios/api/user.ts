import http from '../filter'
import { IRegisterData, ILoginData } from '../../inter-type/form-data'

const LoginApi = (data: ILoginData) => {
    return http({
        url: '/login',
        method: 'post',
        data
    })
}

// 注册api
const RegisterApi = (data: IRegisterData) => {
    return http({
        url: '/register',
        method: 'post',
        data
    })
}

// 获取用户信息
const GetUserApi = () => http({
    url: '/info',
    method: 'get'
})

// 修改用户信息
const UpdateUserApi = (data: ILoginData) => http({
    url: '/info',
    method: 'put',
    data
})

// 更新头像
const UploadAvatar = (data: any) => http({
    url: '/upload',
    method: 'post',
    data
})

export {
    LoginApi,
    RegisterApi,
    GetUserApi,
    UpdateUserApi,
    UploadAvatar
}
