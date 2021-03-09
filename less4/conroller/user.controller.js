const userService = require('../service/user.service');

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
            await userService.createUser(req.body);
            res.status(201).json('user is created');
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    delUser: async (req, res) => {
        try {
            const { userID } = req.params;
            await userService.delUser(userID);
            res.json('User deleted');
        } catch (e) {
            res.status(418).json(e.message);
        }
    }

};
