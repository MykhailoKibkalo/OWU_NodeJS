const router = require('express').Router();

const { userMiddleware } = require('../middleware');

const { userController } = require('../controller');

router.get('/', userMiddleware.isUserTrue, userController.getAllUser);

router.get('/:userID', userMiddleware.isUserTrue, userController.getSingleUser);

router.post('/', userMiddleware.isUserTrue, userController.createUser);

router.delete('/:userID', userController.delUser);

module.exports = router;
