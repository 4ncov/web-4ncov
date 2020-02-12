import Cookie from 'js-cookie'

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
    }
}
