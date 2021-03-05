const jwt = require('jsonwebtoken');
const { authService } = require('../service');

module.exports = {
    isFindUser: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await authService.checkUser({ email });

            if (!user) {
                throw new Error('Cant find this user');
            }
            next();
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                throw new Error('is no token');
            }
            jwt.verify(access_token, 'JWT_SECRET', (err) => {
                if (err) {
                    throw new Error('Not Valid token');
                }
            });
            const tokens = await authService.findAccessToken(access_token);
            if (!tokens) {
                throw new Error('no find user with this token');
            }
            req.user = tokens._user_id;
            console.log(tokens);
            next();
        } catch (e) {
            res.status(418).json(e.message);
        }
    }
};
