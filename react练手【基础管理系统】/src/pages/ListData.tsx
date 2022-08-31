import { Button, List, Pagination, message } from 'antd'
import React, { useEffect, useState, FC } from 'react'
import { delArticle, getListData } from '../axios/api/list'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

interface arrDataType {
    id: number,
    title?: string,
    subTitle?: string,
    date?: string
}

// 列表页
const ListData: FC = () => {
    const [list, setList] = useState<arrDataType[]>([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(1)
    const navigate = useNavigate()

    const getList = (num = current) => {
        getListData({ num }).then((res: any) => {
            const { arr, total, num } = res
            setList(arr)
            setTotal(total)
            setCurrent(num)
        })
    }

    useEffect(() => {
        getList()
    }, [])

    // 页码改变
    const pageChange = (page: number) => {
        getList(page)
    }

    // 编辑
    const editList = (id: number) => {
        navigate('/main/edit', {
            state: { id }
        })
    }
    // 删除
    const delList = (id: number) => {
        delArticle({ id }).then(() => {
            message.success('删除文章成功')
            getList()
        })
    }

    return (
        <>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                style={{ maxHeight: 'calc(100% - 35px)', overflow: 'auto' }}
                dataSource={list}
                renderItem={({ id, title, subTitle, date }: arrDataType) => (
                    <List.Item
                        actions={[
                            <Button type="primary" key={date} onClick={() => editList(id)}>编辑</Button>,
                            <Button danger type="primary" key={date} onClick={() => delList(id)}>删除</Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={<a href="#">{title}</a>}
                            description={subTitle}
                        />
                        <div>{moment(date).format('YYYY-MM-DD hh:mm:ss')}</div>
                    </List.Item>
                )}
            />
            <Pagination onChange={pageChange} showSizeChanger={false} total={total} current={current} style={{ float: 'right', marginTop: '10px' }} />
        </>
    )
}

export default ListData
