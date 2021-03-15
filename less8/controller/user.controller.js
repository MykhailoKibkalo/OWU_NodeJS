const { emailTemplatesEnum, errorMessageEnum } = require('../constant');
const { userService, emailService } = require('../service');
const { passwordHasher } = require('../helpers');

module.exports = {

    getAllUser: async (req, res) => {
        try {
            const users = await userService.getAllUser();
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userID } = req.params;
            const user = await userService.getSingleUser(userID);
            res.json(user);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password, email, name } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await emailService.sendEmail(email, emailTemplatesEnum.HELLO, { userName: name });

            res.status(201).json(errorMessageEnum.CRT_USER);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    delUser: async (req, res) => {
        try {
            const { userID } = req.params;

            const user = await userService.getSingleUser(userID);

            if (userID !== req.user._id.toString()) {
                throw new Error(errorMessageEnum.NO_ATH);
            }

            await userService.delUser(userID);

            await emailService.sendEmail(user.email, emailTemplatesEnum.USER_IS_DEL, { userName: user.name });

            res.json(errorMessageEnum.DEL_USER);
        } catch (e) {
            res.status(418).json(e.message);
        }
    }

};
