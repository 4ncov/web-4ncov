module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://dev.4ncov.com',
                changeOrigin: true,
                headers: {
                    host: 'api-dev.4ncov.com'
                }
            }
        }
    }
}
