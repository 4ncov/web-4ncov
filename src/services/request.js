import axios from 'axios'
import { Message } from 'element-ui'
import Bus from '../utils/bus'

const request = axios.create({
    baseURL: '/api'
})
request.interceptors.request.use(function(req) {
    Bus.$emit('loading', true)
    const token = localStorage.getItem('token')
    if (token) req.headers.Authorization = 'Bearer ' + token
    return req
})
request.interceptors.response.use(
    function(response) {
        Bus.$emit('loading', false)
        return response.data
    },
    function(error) {
        Bus.$emit('loading', false)
        Message({ type: 'error', message: error.response.data.message })
        return Promise.reject(error)
    }
)

export default request
