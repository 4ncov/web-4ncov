import request from './request'

export default {
    async listProvinces() {
        const response = await request.get('/master-data/provinces')
        return response.data
    },
    async listCities(province) {
        const response = await request.get(`/master-data/cities?province=${province}`)
        return response.data
    },
    async listDistricts(province, city) {
        const response = await request.get(`/master-data/districts?province=${province}&city=${city}`)
        return response.data
    }
}
