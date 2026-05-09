import { createRouter, createWebHistory } from 'vue-router'
import Merchant from '../pages/Merchant.vue'

const routes = [
    { path: '/', component: Merchant }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router