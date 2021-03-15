const Car = require('../dataBase/models/Car');

module.exports = {
    getAllCar: () => Car.find(),

    getSingleCar: (carID) => Car.findById(carID),

    createCar: (carObject) => Car.create(carObject),

    delCar: (carID) => Car.findByIdAndDelete(carID)
};
