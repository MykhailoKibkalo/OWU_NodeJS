const Joi = require('joi');
const { regexEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(20),
    email: Joi.string().regex(regexEnum.EMAIL_RAGEX).required(),
    password: Joi.string().regex(regexEnum.PASS_REGEX).required()
});
