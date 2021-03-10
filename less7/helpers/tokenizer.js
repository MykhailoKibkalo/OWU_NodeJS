const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH } = require('../configs/config');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH, { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};
