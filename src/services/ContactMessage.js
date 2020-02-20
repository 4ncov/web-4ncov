import request from './request'
import UserService from './user'

export default {
    async create(message) {
        await request({
            url: '/contact-messages',
            method: 'post',
            data: message,
            headers: { 'Authorization': `Bearer ${UserService.getToken()}` }
        })
    }
}
