// 登录页
import '../assets/css/pages/Login.scss'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../axios/api/user'
import { ILoginData } from '../inter-type/form-data'

const { Item } = Form
const { Password } = Input
const Login = () => {
    const navigate = useNavigate()
    const onFinish = ({ username, password }: ILoginData) => {
        LoginApi({ username, password }).then((res: { [k: string]: any }) => {
            const { avatar, editable, player, username } = res
            // 存储数据
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('cms-token', res['cms-token'])
            localStorage.setItem('editable', editable)
            localStorage.setItem('player', player)
            localStorage.setItem('username', username)
            message.success('登录成功！')
            setTimeout(() => {
                navigate('/main/list')
            }, 1500)
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <>
            <div className="login">
                <div className="containers">
                    {/* logo */}
                    <img src="" alt="此处为logo" />
                    {/* 登录表单 */}
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="请输入用户名"
                            />
                        </Item>

                        <Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Password size="large" prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="请输入密码"
                            />
                        </Item>
                        <Item>
                            <Link to="/register">还没账号？立即注册</Link>
                        </Item>

                        <Item>
                            <Button size="large" type="primary" block htmlType="submit">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login
