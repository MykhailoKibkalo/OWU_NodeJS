const errorCodes = require('../constant/errorCodes.enum');
// const errorMessage = require('../constant/errorMassege.enum');
const { userValidators } = require('../validators');

module.exports = {

    isUserTrue: (req, res, next) => {
        try {
            const { error } = userValidators.creatUserValidators.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    userCheckId: (req, res, next) => {
        try {
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
};
