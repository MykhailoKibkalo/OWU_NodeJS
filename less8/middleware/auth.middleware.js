const jwt = require('jsonwebtoken');
const { constants, errorMessageEnum } = require('../constant');
const { JWT_SECRET, JWT_REFRESH } = require('../configs/config');
const { authService } = require('../service');

module.exports = {
    isFindUser: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await authService.checkUser({ email });

            if (!user) {
                throw new Error(errorMessageEnum.NO_USER);
            }
            next();
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);
            console.log(access_token);
            if (!access_token) {
                throw new Error(errorMessageEnum.NO_VALID_TOKEN);
            }
            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessageEnum.NO_TOKEN);
                }
            });

            const tokens = await authService.findToken(access_token);

            if (!tokens) {
                throw new Error(errorMessageEnum.NO_USER_TOKEN);
            }
            req.user = tokens._user_id;
            console.log(tokens);
            next();
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(errorMessageEnum.NO_TOKEN);
            }
            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    throw new Error(errorMessageEnum.NO_VALID_TOKEN);
                }
            });
            const tokens_refresh = await authService.findToken(refresh_token);
            if (!tokens_refresh) {
                throw new Error(errorMessageEnum.NO_USER_TOKEN);
            }
            req.user = tokens_refresh._user_id;
            console.log(tokens_refresh);
            next();
        } catch (e) {
            res.status(418).json(e.message);
        }
    },
};
