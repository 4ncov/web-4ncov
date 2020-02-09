module.exports = {
    //  "expiresAt": "2020-02-07T04:02:26.346Z",
    // "token": "string"
    setInfo(token) {
        localStorage.setItem('token', token)
    },
    isLogin() {
        const token = localStorage.getItem('token')
        return !!toekn
    }
}
