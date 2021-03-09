const router = require('express').Router();

const { userMiddleware, authMiddleware } = require('../middleware');

const { userController, } = require('../controller');

router.get('/', userMiddleware.isUserTrue, userController.getAllUser);

router.get('/:userID', userMiddleware.isUserTrue, userController.getSingleUser);

router.post('/', userMiddleware.isUserTrue, userController.createUser);

router.delete('/:userID', authMiddleware.checkAccessTokenMiddleware, userController.delUser);

module.exports = router;
