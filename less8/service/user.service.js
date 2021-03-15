const User = require('../dataBase/models/User');
require('../dataBase/models/Car');

module.exports = {
    getAllUser: () => User.find(),

    getSingleUser: (userID) => User.findById(userID),

    createUser: (userObject) => User.create(userObject),

    delUser: (userID) => User.findByIdAndDelete(userID)
};
