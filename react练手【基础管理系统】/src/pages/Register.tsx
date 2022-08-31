// 注册页
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/pages/Login.scss'
import { RegisterApi } from '../axios/api/user'
import { IRegisterData } from '../inter-type/form-data'

const { Item } = Form
const { Password } = Input
const Register = () => {
    const navigate = useNavigate()
    const onFinish = ({ username, password }: IRegisterData) => {
        RegisterApi({ username, password }).then(res => {
            message.success('注册成功！正在跳转到登录页')
            setTimeout(() => {
                navigate('/login')
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
                    {/* 注册表单 */}
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="请输入用户名"
                            />
                        </Item>

                        <Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Password size="large" prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="请输入密码"
                            />
                        </Item>
                        <Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入密码!'
                                },
                                ({ getFieldValue }) => ({
                                    validator (_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('两次密码不一致!'))
                                    }
                                })
                            ]}
                        >
                            <Password
                                size="large"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="请再次输入密码"
                            />
                        </Item>
                        <Item>
                            <Link to="/login">已有账号？前往登录</Link>
                        </Item>
                        <Item>
                            <Button size="large" type="primary" block htmlType="submit">
                                立即注册
                            </Button>
                        </Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register
