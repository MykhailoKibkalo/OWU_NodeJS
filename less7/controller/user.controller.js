const { emailTemplatesEnum } = require('../constant');
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

            res.status(201).json('user is created');
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    delUser: async (req, res) => {
        try {
            const { userID } = req.params;

            if (userID !== req.user._id.toString()) {
                throw new Error('UnAuthorized');
            }

            await userService.delUser(userID);
            res.json('User deleted');
        } catch (e) {
            res.status(418).json(e.message);
        }
    }

};
