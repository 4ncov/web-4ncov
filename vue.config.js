module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api-dev.4ncov.com',
                changeOrigin: true,
                headers: {
                    host: 'api-dev.4ncov.com'
                }
            }
        }
    }
}
