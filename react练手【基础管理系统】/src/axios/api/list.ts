import http from '../filter'
import { IListParams, IAddArticleData, updateArticleDataType } from '../../inter-type/form-data'

const getListData = (params: IListParams) => http({
    url: '/article',
    method: 'get',
    params: { ...params, count: 10 }
})

const add = (data: IAddArticleData) => http({
    url: '/article/add',
    method: 'post',
    data
})

const getDataById = (id: number) => http({
    url: `/article/${id}`,
    method: 'get'
})

const updateArticle = (data: updateArticleDataType) => http({
    url: '/article/update',
    method: 'put',
    data
})

const delArticle = (data: {id: number}) => http({
    url: '/article/remove',
    method: 'post',
    data
})

export {
    getListData,
    add,
    getDataById,
    updateArticle,
    delArticle
}
