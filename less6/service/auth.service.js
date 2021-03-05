const { User, O_Auth } = require('../dataBase/models');

module.exports = {
    checkUser: (email) => User.findOne(email),
    checkToken: (token, user) => O_Auth.create({ ...token, _user_id: user._id }),
    findAccessToken: (access_token) => O_Auth.findOne({ access_token }).populate('_user_id')
};
