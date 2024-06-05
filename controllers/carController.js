const CarRepository = require("../repositories/carRepository.js");

class CarController {
  async getAll(req, res) {
    const Car = await CarRepository.findAll();
    res.json(Car);
  }

  async getById(req, res) {
    const Car = await CarRepository.findById(req.params.id);
    res.json(Car);
  }

  async create(req, res) {
    const newCar = await CarRepository.create(req.body);
    res.json(newCar);
  }

  async update(req, res) {
    const updatedCar = await CarRepository.update(req.params.id, req.body);
    res.json(updatedCar);
  }

  async delete(req, res) {
    await CarRepository.delete(req.params.id);
    res.json({ message: "Car deleted" });
  }
}

module.exports = new CarController();
