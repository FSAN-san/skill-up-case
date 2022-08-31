import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TPropsAsideBread } from '../inter-type/other-type'

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout

interface IProps {
    menuItem: TPropsAsideBread[]
}

const Aside: FC<IProps> = (props) => {
    const { menuItem } = props
    const { pathname } = useLocation()
    const navigator = useNavigate()
    // 通过传递的item数据，构建菜单栏
    const items: MenuItem[] = menuItem.map(({ name, router, icon }: TPropsAsideBread) => ({
        label: name,
        key: router,
        icon
    }))
    // 点击Menu
    const changeRouter = ({ key }: { key: string }) => {
        navigator(key)
    }
    return (
        <Sider>
            <Menu onClick={changeRouter} theme="dark" selectedKeys={[pathname]} mode="inline" inlineIndent={30}
                items={items}
            />
        </Sider>
    )
}

export default Aside
