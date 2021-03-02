const userService = require('../service/user.service');

module.exports = {

    getAllUser: async (req, res) => {
        console.log('ffffffffffffffffffffffffffffff');
        const users = await userService.findUsers();
        console.log(users);
        res.json(users);
    },

    getSingleUser: async (req, res) => {
        const { userID } = req.params;
        const user = await userService.findUserById(userID);
        res.json(user);
    },

    createUser: async (req, res) => {
        const user = req.body;
        console.log(user);
        await userService.createUser(user);
        res.status(201).json('user is created');
    }

};
