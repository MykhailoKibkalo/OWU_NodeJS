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

    checkAccessTokenMiddleware: (req, res, next) => {
        try {
            const token = req.get('Authorization');

            console.log(token);
            next();
        } catch (e) {
            next(e);
        }
    }
};
