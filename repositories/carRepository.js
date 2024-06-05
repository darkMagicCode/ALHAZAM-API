const Car = require("../models/Car.js");

class CarRepository {
  async findAll() {
    try {
      return await Car.find();
    } catch (error) {
      throw new Error(`Error in findAll: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await Car.findById(id);
    } catch (error) {
      throw new Error(`Error in findById: ${error.message}`);
    }
  }

  async create(carData) {
    try {
      const car = new Car(carData);
      return await car.save();
    } catch (error) {
      throw new Error(`Error in create: ${error.message}`);
    }
  }

  async update(id, carData) {
    try {
      const updatedCar = await Car.findByIdAndUpdate(id, carData, { new: true });
      return updatedCar;
    } catch (error) {
      throw new Error(`Error in update: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await Car.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error in delete: ${error.message}`);
    }
  }
}

module.exports = new CarRepository();
