import request from './request'

export default {
    async getSuppliedMaterials(page, size, category) {
        let url = `/supplied-materials?page=${page}&size=${size}`
        url += !!category && `&category=${category}` || ''
        const response = await request.get(url)
        return response.data
    }
}
