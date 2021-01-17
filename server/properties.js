module.exports = {
	db_url: (process.env.DB_HOST || 'localhost') + ':27017/miniBank',
    publicPath: '../client/dist',
    port: process.env.NODE_PORT || 3000,
    scrapUrl:  "https://hn.algolia.com/api/v1/search_by_date?query=nodejs",
    api: process.env.NODE_API != null ? process.env.NODE_API : '/api',
    seedDB: process.env.seedDB != null ? process.env.seedDB : true,
    JWT_SECRET: 'HTfPI8UyzTDeQg6c6VKN'
}