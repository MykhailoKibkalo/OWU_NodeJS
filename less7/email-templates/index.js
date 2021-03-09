const { emailTemplatesEnum } = require('../constant');

module.exports = {
    [emailTemplatesEnum.HELLO]: {
        templateName: 'Hello',
        subject: 'Hi there. Welcome to the club, buddy'
    },

    [emailTemplatesEnum.USER_IS_BLOCK]: {
        templateName: 'user-block',
        subject: 'Sorry, but your acc was blocked'
    },

    [emailTemplatesEnum.PASSWORD_CHANGED]: {
        templateName: 'chng-pass',
        subject: 'Your password was successful changed'
    }
};
