import { SET_USER } from '../../inter-type/redux-type'

interface IState {
    username: string,
    avatar: string
}

const defaultState: IState = {
    username: '',
    avatar: ''
}

// 具体操作，给通过action构建器传入data创建一个action
const handler: any = {
    [SET_USER]: (state: IState, { username, avatar }: IState) => ({ username, avatar })
}

export default (state = defaultState, action: { type: string, data: IState }) => {
    const { type, data } = action
    return handler[type] ? handler[type](state, data) : state
}
