import request from './request'

export default {
    async getRequiredMaterials(page, size, category) {
        let url = `/required-materials?page=${page}&size=${size}`
        url += !!category && `&category=${category}` || ''
        const response = await request.get(url)
        return response.data
    },
    async getMyRequiredMaterials(page, size) {
        const response = await request.get(`/required-materials/me?page=${page}&size=${size}`)
        return response.data
    }
}
