module.exports = {
    db: {
        name: process.env.DB_NAME || 'minesweeper',
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT || 27017,
    },

    mongodb: {
        url: 'mongodb://root:1234@ds139446.mlab.com:39446/oauth-project-test'
    },
    api: {
        port: process.env.PORT || 3000
    }
}