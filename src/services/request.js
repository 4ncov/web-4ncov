import axios from 'axios'

const request = axios.create({
    baseURL: '/api'
})
request.interceptors.request.use(function(req) {
    const token = localStorage.getItem('token')
    if (token) req.headers.token = token
    return req
})
request.interceptors.response.use(
    function(response) {
        return response.data
    },
    function(error) {
        return Promise.reject({
            message: error.response.data.message
        })
    }
)

export default request
