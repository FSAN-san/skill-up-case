import { Button, Form, Input, message, Upload } from 'antd'
import { FC, useEffect, useState } from 'react'
import { GetUserApi, UpdateUserApi } from '../axios/api/user'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { UploadChangeParam } from 'antd/es/upload'
import { connect } from 'react-redux'
import { setUser as reduxSetUser } from '../redux/action-creator'

// 资料页
const Means: FC<any> = (props) => {
    const [form] = Form.useForm()
    const [user, setUser] = useState<{ username: string, password: string }>({ username: '', password: '' })
    const navigate = useNavigate()
    const { reduxSetUser } = props

    useEffect(() => {
        GetUserApi().then((res: any) => {
            const { username, password } = res
            form.setFieldsValue({
                username,
                password
            })
            setUser({ username, password })
        })
    }, [])
    const onFinish = (values: any) => {
        // 如果改变了账号就更新
        if (JSON.stringify(user) !== JSON.stringify(values)) {
            console.log('updated')
            const { username, password } = values
            UpdateUserApi({ username, password }).then(res => {
                message.success('账号信息修改成功，正在重新登录')
                localStorage.clear()
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            })
        } else {
            message.info('信息未修改')
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo)
    }

    const getBase64 = (img: RcFile, fn: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => fn(reader.result as string))
        reader.readAsDataURL(img)
    }
    // 提交之前，检查
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('只能提交 JPG/PNG 类型的文件!')
        }
        const isLt2K = file.size / 1024 / 1024 / 1024 < 200
        if (!isLt2K) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2K
    }
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>()

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false)
                setImageUrl(url)
                // 成功后替换存储
                localStorage.setItem('avatar', info.file.response.data.filePath)
                reduxSetUser({ username: 'null', avatar: url })
            })
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    return (
        <>
            <Form
                name="basic"
                form={form}
                style={{ width: '400px' }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="修改用户名"
                    name="username"
                    rules={[{ required: true, message: '用户名不可为空!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="修改密码"
                    name="password"
                    rules={[{ required: true, message: '密码不可为空!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 18, span: 4 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                headers={{
                    'cms-token': localStorage.getItem('cms-token')!
                }}
                action="/manage/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    )
}

export default connect(null, {
    reduxSetUser
})(Means)
