import request from './request'

export default {
    async getRequiredMaterials(page, size, category) {
        let url = `/required-materials?page=${page}&size=${size}`
        url += !!category && `&category=${category}` || ''
        const response = await request.get()
        return response.data
    }
}
