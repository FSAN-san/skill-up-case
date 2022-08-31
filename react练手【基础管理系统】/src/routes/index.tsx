import { useRoutes, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router/lib/router'
import Loading from '../components/Loading'
import List from '../pages/ListData'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import App from '../App'

// 懒加载
const Error = lazy(() => import('../pages/Error'))
const Register = lazy(() => import('../pages/Register'))
const Login = lazy(() => import('../pages/Login'))

/**
 * 路由结构；
 * App > List + Edit + Means
 * Login
 * Register
 */

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to={'/login'} />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/main',
        element: <App />,
        children: [
            {
                path: 'list',
                element: <List />
            },
            {
                path: 'edit',
                element: <Edit />
            },
            {
                path: 'means',
                element: <Means />
            }
        ]
    },
    {
        path: '*',
        element: <Error />
    }
]

const MyRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            {useRoutes(routes)}
        </Suspense>
    )
}

export default MyRoutes
