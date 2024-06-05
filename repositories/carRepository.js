const Car = require('../models/Car.js');

class CarRepository {
    async findAll() {
        return await Car.find();
    }

    async findById(id) {
        return await Car.findById(id);
    }

    async create(Car) {
        return await Car.create(Car);
    }

    async update(id, Car) {
        return await Car.findByIdAndUpdate(id, Car, { new: true });
    }

    async delete(id) {
        return await Car.findByIdAndDelete(id);
    }
}

module.exports = new CarRepository();
