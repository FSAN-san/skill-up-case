import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { FC } from 'react'
import './assets/css/App.scss'
import { TPropsAsideBread } from './inter-type/other-type'
import {
    ReadOutlined,
    EditOutlined,
    DatabaseOutlined
} from '@ant-design/icons'
import Header from './components/Header'
import Aside from './components/Aside'
import Bread from './components/Bread'

// 渲染侧边栏和面包屑
const menuItem: TPropsAsideBread[] = [
    {
        name: '查看文章列表',
        router: '/main/list',
        icon: <ReadOutlined />
    },
    {
        name: '文章编辑',
        router: '/main/edit',
        icon: <EditOutlined />
    },
    {
        name: '修改资料',
        router: '/main/means',
        icon: <DatabaseOutlined />
    }
]

const App: FC = () => {
    const { Content } = Layout
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Layout>
                <Aside menuItem={menuItem} />
                <Content className="content-box">
                    <Bread menuItem={menuItem} />
                    <div className="containers">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <footer>Respect | Copyright &copy; 2022 Author Xin</footer>
        </Layout>
    )
}

export default App
