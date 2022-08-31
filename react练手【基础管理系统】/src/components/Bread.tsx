import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { FC } from 'react'
import '../assets/css/components/Bread.scss'
import { TPropsAsideBread } from '../inter-type/other-type'
import { useLocation } from 'react-router-dom'

interface IProps {
    menuItem: TPropsAsideBread[]
}

const App: FC<IProps> = ({ menuItem }) => {
    const { pathname } = useLocation()
    const nowMenu: TPropsAsideBread | undefined = menuItem.find(({ router }: TPropsAsideBread) => pathname === router)
    return (
        <Breadcrumb className="bread">
            <Breadcrumb.Item href="/main">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                {nowMenu?.name}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default App
