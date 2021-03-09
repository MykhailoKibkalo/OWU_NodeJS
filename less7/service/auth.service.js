const { User, O_Auth } = require('../dataBase/models');

module.exports = {
    checkUser: (email) => User.findOne(email),
    checkToken: (token, user) => O_Auth.create({ ...token, _user_id: user._id }),
    findToken: (token) => O_Auth.findOne({ token }).populate('_user_id'),
    delToken: (tokens) => O_Auth.findByIdAndRemove(tokens._id)
};
