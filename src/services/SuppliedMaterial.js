import request from './request'

export default {
    async getSuppliedMaterials(page, size, category) {
        let url = `/supplied-materials?page=${page}&size=${size}`
        url += !!category && `&category=${category}` || ''
        const response = await request.get(url)
        return response.data
    },
    async getMySuppliedMaterials(page, size) {
        const response = await request.get(`/supplied-materials/me?page=${page}&size=${size}`)
        return response.data
    },
    async getDetail(id) {
        const response = await request.get(`/supplied-materials/${id}`)
        return response.data
    }
}
