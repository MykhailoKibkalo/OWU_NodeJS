const carService = require('../service/car.service');

module.exports = {

    getAllCar: async (req, res) => {
        try {
            const cars = await carService.getAllCar();
            res.json(cars);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    getSingleCar: async (req, res) => {
        try {
            const { carID } = req.params;
            const car = await carService.getSingleCar(carID);
            res.json(car);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);
            res.status(201).json('car is created');
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    delCar: async (req, res) => {
        try {
            const { carID } = req.params;
            await carService.delCar(carID);
            res.json('Car deleted');
        } catch (e) {
            res.status(418).json(e.message);
        }
    }

};
