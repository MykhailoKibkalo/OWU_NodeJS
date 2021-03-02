const router = require('express').Router();

const carController = require('../conroller/car.controller');

router.get('/', carController.getAllCar);

router.get('/:carID', carController.getSingleCar);

router.post('/', carController.createCar);

router.delete('/:carID', carController.delCar);

module.exports = router;
