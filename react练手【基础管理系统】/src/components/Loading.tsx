import { FC } from 'react'
import { Spin } from 'antd'
const Loading: FC = () => {
    return (
        <div style={{ width: '100%', height: '100%', lineHeight: '100vh', textAlign: 'center' }}>
            <Spin size="large" tip={'Loading...'} />
        </div>
    )
}

export default Loading
