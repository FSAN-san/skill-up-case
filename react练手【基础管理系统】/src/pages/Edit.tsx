import { Button, PageHeader, Modal, Form, Input, message } from 'antd'
import { FC, useState, useEffect } from 'react'
import moment from 'moment'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { add, getDataById, updateArticle } from '../axios/api/list'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from 'history'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: (form: any) => void;
    title: string
    subTitle: string
}

// 封装表单对话框
const CollectionCreateForm: FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
    title,
    subTitle
}) => {
    const [form] = Form.useForm()
    return (
        <Modal
            visible={visible}
            title="填写文章标题"
            okText="确认提交"
            cancelText="取消"
            onCancel={() => onCancel(form)}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields()
                        onCreate(values)
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info)
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ title, subTitle }}
            >
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '文章标题不能为空!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="subTitle" label="副标题">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

// 编辑页
const Edit: FC = () => {
    const location: Location = useLocation()
    const navigate = useNavigate()
    const [backIconVisible, setBackIconVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')

    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)

    // 编辑器内容
    const [html, setHtml] = useState<string>('')

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...'
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        // 防止再次点击文章编辑，清空编辑器
        if (editor) {
            editor.setHtml('')
            setBackIconVisible(false)
        }
        const nowId = (location.state as { id: number })?.id
        if (nowId) {
            setBackIconVisible(true)
            getDataById(nowId).then((res: any) => {
                const { content, title, subTitle } = res
                setHtml(content)
                setTitle(title)
                setSubTitle(subTitle)
            })
        }
        return () => {
            if (!editor) return
            editor.destroy()
            setEditor(null)
        }
    }, [location.state])

    // 关闭对话框
    const closeDialog = () => {
        setIsModalVisible(false)
    }

    // 表单验证成功后处理
    const onCreated = async (values: any) => {
        const { title, subTitle } = values
        let res: any
        const id = (location.state as { id: number })?.id
        if (id) {
            // 更新
            res = await updateArticle({ title, subTitle, content: html, id })
        } else {
            // 添加
            res = await add({ title, subTitle, content: html })
        }
        message.success(res.message)
        closeDialog()
        navigate('/main/list')
    }

    // 对话框取消
    const onCancel = (form: any) => {
        form.resetFields()
        closeDialog()
    }

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    navigate(-1)
                }}
                backIcon={backIconVisible && <ArrowLeftOutlined />}
                title="文章编辑"
                subTitle={`当前日期：${moment(new Date()).format('YYYY-M-D')}`}
                extra={[
                    <Button type="primary" key="1" onClick={() => setIsModalVisible(true)}>提交文章</Button>
                ]}
            />

            <CollectionCreateForm visible={isModalVisible} onCreate={onCreated} onCancel={onCancel} title={title}
                subTitle={subTitle}
            />

            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default Edit
