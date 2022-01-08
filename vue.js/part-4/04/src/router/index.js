import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Logout from '../views/Logout.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/logout',
        component: Logout
    },
    {
        path: '/manager/list',
        component: () => import('@/views/manager/List.vue')
    },
    {
        path: '/manager/findPassword',
        component: () => import('@/views/manager/FindPassword.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
