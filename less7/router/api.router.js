const router = require('express').Router();

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const carRouter = require('./car.router');

router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/users', userRouter);

module.exports = router;
