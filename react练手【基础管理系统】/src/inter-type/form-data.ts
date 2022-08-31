// 注册
export type IRegisterData = {
    username: string,
    password: string
}

// 登录
export type ILoginData = {
    username: string,
    password: string
}

// 获取文章列表
export type IListParams = {
    num?: number
}

// 添加文章data
export type IAddArticleData = {
    title: string,
    subTitle: string,
    content: string
}

// 更新文章data
export type updateArticleDataType = IAddArticleData & {
    id: number
}
