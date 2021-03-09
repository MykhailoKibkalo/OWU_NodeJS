const router = require('express').Router();

const { carMiddleware } = require('../middleware');

const { carController } = require('../controller');

router.get('/', carMiddleware.isCarTrue, carController.getAllCar);

router.get('/:carID', carMiddleware.isCarTrue, carController.getSingleCar);

router.post('/', carMiddleware.isCarTrue, carController.createCar);

router.delete('/:carID', carController.delCar);

module.exports = router;
