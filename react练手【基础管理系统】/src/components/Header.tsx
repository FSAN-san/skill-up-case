import { FC, useEffect, useState } from 'react'
import { Dropdown, Menu, Space, message } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import defaultAvatar from '../assets/image/defaultAvatar.png'
import '../assets/css/components/Header.scss'
import { sendProxyUrl } from '../constant/url'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { connect } from 'react-redux'

const Header: FC<any> = (props) => {
    const [name, setName]: [name: string, setName: (newName: string) => void] = useState('游客')
    const [avatar, setAvatar]: [avatar: string, setAvatar: (avatar: string) => void] = useState(defaultAvatar)
    const navigate = useNavigate()
    const { state } = props

    // 页面初始化赋值头像和用户名
    useEffect(() => {
        const localName = localStorage.getItem('username')
        const localAvatar = localStorage.getItem('avatar')
        setName(localName || '游客')
        setAvatar(localAvatar ? sendProxyUrl + '/' + localAvatar : defaultAvatar)
    }, [state])

    // menu点击
    const handleMenuClick: MenuProps['onClick'] = e => {
        const { key } = e
        if (key === '3') {
            logout()
        }
    }

    // 退出账号
    const logout = () => {
        localStorage.clear()
        message.success('账号已退出，正在返回登录页')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    key: '1',
                    label: (
                        <>
                            修改资料
                        </>
                    )
                },
                {
                    type: 'divider'
                },
                {
                    key: '3',
                    label: (
                        <>
                            退出登录
                        </>
                    )
                }
            ]}
        />
    )

    return (
        <header>
            <div className="logo">
                <img src="" alt="this logo" />
            </div>
            <div className="right">
                <Dropdown overlay={menu} overlayStyle={{ width: '150px', height: '100%' }}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            <img src={avatar} alt="" className="avatar" />
                            {name}
                            <CaretDownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

export default connect(state => ({
    state
}), null)(Header)
