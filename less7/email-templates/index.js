const { emailTemplatesEnum } = require('../constant');

module.exports = {
    [emailTemplatesEnum.HELLO]: {
        templateName: 'Hello',
        subject: 'Hi there. Welcome to the club, buddy'
    },

    [emailTemplatesEnum.USER_IS_DEL]: {
        templateName: 'user-del',
        subject: 'Yours acc successful deleted'
    }
};
