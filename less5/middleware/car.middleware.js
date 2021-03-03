const errorCodes = require('../constant/errorCodes.enum');
const errorMessage = require('../constant/errorMesssge.enum');
const { carValidators } = require('../validators');

module.exports = {
    carCheckId: (req, res, next) => {
        try {
            const { carId } = req.params;

            if (carId.length !== 24) {
                throw new Error(errorMessage.WRONG_ID.en);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarTrue: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidators.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
