module.exports = {
    db: {
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT || 20017,
        username: process.env.DB_USER_NAME || 'admin',
        password: process.env.DB_PASSWORD || '1234'
    },
    
    api: {
        port: process.env.API_PORT || 3000
    }
}