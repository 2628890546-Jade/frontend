import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://risk-backend-production.up.railway.app'
const api = axios.create({
    baseURL: API_BASE + '/api',
    timeout: 5000
})

export const getMerchants = () => api.get('/merchants')
export const getMerchant = (id) => api.get(`/merchant/${id}`)
export const getThreshold = () => api.get('/threshold')
export const updateThreshold = (data) => api.post('/threshold', data)
export const getStatistics = () => api.get('/statistics')