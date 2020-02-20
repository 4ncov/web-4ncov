import Cookie from 'js-cookie'
import request from '../services/request'

export default {
    setInfo(token, expiresAt, role) {
        const expires = new Date(expiresAt)
        Cookie.set('token', token, { expires })
        Cookie.set('role', role, { expires })
    },
    isLogin() {
        return !!Cookie.get('token')
    },
    isSupplier() {
        return Cookie.get('role') === 'SUPPLIER'
    },
    isHospital() {
        return Cookie.get('role') === 'HOSPITAL'
    },
    getToken() {
        return Cookie.get('token')
    },
    async getMyDetail() {
        const response = await request({
            url: '/users/me',
            method: 'get',
            headers: { 'Authorization': `Bearer ${Cookie.get('token')}` }
        })
        return response.data
    }
}
