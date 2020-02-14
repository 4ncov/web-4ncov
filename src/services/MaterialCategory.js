import request from './request'

export default {
    async getAllCategories() {
        const response = await request.get('/material-categories')
        return response.data
    }
}
