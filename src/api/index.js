import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    timeout: 5000
})

export const getMerchants = () => api.get('/merchants')
export const getMerchant = (id) => api.get(`/merchant/${id}`)
export const getThreshold = () => api.get('/threshold')
export const updateThreshold = (data) => api.post('/threshold', data)
export const getStatistics = () => api.get('/statistics')