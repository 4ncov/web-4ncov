import request from './request'

export default {
    async getRequiredMaterials(page, size, category) {
        const response = await request.get(`/required-materials?page=${page}&size=${size}&category=${category}`)
        return response.data
    }
}
