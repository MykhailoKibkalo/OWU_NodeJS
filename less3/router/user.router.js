const router = require('express').Router();
const userController = require('../conroller/user.controller');

router.get('/', userController.getAllUser);

router.get('/:userID', userController.getSingleUser);

router.post('/', userController.createUser);

module.exports = router;
