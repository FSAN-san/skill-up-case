import { SET_USER } from '../../inter-type/redux-type'

interface IState {
    username: string,
    avatar: string
}

// 通过传入data创建一个action对象
const setUser = (data: IState) => ({ type: SET_USER, data })

export {
    setUser
}
