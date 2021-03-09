const router = require('express').Router();
const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isFindUser, authController.checkUser);
router.post('/refresh', authMiddleware.checkRefreshTokenMiddleware, authController.createRefreshedToken);

module.exports = router;
