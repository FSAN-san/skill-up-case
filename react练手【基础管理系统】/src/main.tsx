import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/css/base.scss'
import App from './routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Fragment>
        {/* 为每个容器组件传递store */}
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </Fragment>
)
