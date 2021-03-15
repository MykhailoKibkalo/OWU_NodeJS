module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/my-app',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH: process.env.JWT_REFRESH || 'REFRESH SECRET',
    PORT: process.env.PORT || '5000',

    EMAIL_SENDER: process.env.EMAIL_SENDER || 'hijhlk@gmail.com',
    EMAIL_SENDER_PASS: process.env.EMAIL_SENDER_PASS || 'ghjkl'
};
