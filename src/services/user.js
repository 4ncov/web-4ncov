module.exports = {
    //  "expiresAt": "2020-02-07T04:02:26.346Z",
    // "token": "string"
    setInfo(token, expiresAt, role) {
        localStorage.setItem('token', token)
        localStorage.setItem('expiresAt', new Date(expiresAt).getTime())
        localStorage.setItem('role', role)
    },
    isLogin() {
        const token = localStorage.getItem('token')
        const expiresAt = localStorage.getItem('expiresAt')
        return !!token && !!expiresAt && Date.now() < Number(expiresAt)
    },
    isSupplier() {
        return localStorage.getItem('role') === 'SUPPLIER'
    },
    isHospital() {
        return localStorage.getItem('role') === 'HOSPITAL'
    }
}
