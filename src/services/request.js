import axios from 'axios'

const request = axios.create({
    baseURL: '/api'
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
