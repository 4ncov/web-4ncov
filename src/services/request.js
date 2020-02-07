import axios from 'axios'

const request = axios.create({
    baseURL: '/api'
})

request.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error)
    }
)

export default request
