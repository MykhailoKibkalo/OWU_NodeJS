const Joi = require('joi');
const { constants, regexEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(20),
    email: Joi.string().regex(regexEnum.EMAIL_RAGEX).required(),
    password: Joi.string().regex(regexEnum.PASS_REGEX).required(),
    age: Joi.number().integer().min(18).max(99),
    yearOfBorn: Joi.number().integer().min(constants.CURRENT_YEAR - 100).max(constants.CURRENT_YEAR),
    car: Joi.boolean(),
    yearOfCar: Joi.optional().when('car', { is: true, then: Joi.required() }),
});
