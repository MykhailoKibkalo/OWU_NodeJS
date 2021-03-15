const router = require('express').Router();

const { authMiddleware, fileMiddlewares, userMiddleware } = require('../middleware');

const { userController, } = require('../controller');

router.get('/', userMiddleware.isUserTrue, userController.getAllUser);

router.get('/:userID', userMiddleware.isUserTrue, userController.getSingleUser);

router.post(
    '/',
    fileMiddlewares.checkFile,
    fileMiddlewares.checkImage,
    userMiddleware.isUserTrue,
    userController.createUser
);

router.delete('/:userID', authMiddleware.checkAccessTokenMiddleware, userController.delUser);

module.exports = router;
