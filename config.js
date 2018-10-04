module.exports = {
    db: {
        database: process.env.DB_NAME || 'minesweeper',
        host: process.env.DB_HOST || 'ds121753.mlab.com',
        port: process.env.DB_PORT || 21753,
        username: process.env.DB_USER_NAME || 'admin',
        password: process.env.DB_PASSWORD || '1234qwer'
    },
    
    api: {
        port: process.env.PORT || 3000
    }
}