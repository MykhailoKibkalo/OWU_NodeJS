const User = require('../dataBase/models/User');

module.exports = {
    checkUser: (email) => User.findOne(email)
};
