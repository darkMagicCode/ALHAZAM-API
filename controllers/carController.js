const CarRepository = require("../repositories/carRepository.js");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const {
  saveImages,
  updateImages,
  deleteImages,
} = require("../utils/imageUtils.js");

dotenv.config();

class CarController {
  async getAll(req, res) {
    const Car = await CarRepository.findAll();
    res.json(Car);
  }

  async getById(req, res) {
    const Car = await CarRepository.findById(req.params.id);
    res.json(Car);
  }

  // Inside create method
  async create(req, res) {
    try {
      const { name, images } = req.body;
      const imageUrls = await saveImages(images);
      const carData = { name, images: images };
      const car = await CarRepository.create(carData);
      res.json({ car });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const { images } = req.body;
      let imageUrls = [];

      if (images && images.length > 0) {
        imageUrls = await updateImages(images);
      }

      const updatedCarData = { ...req.body, images: images };
      const updatedCar = await CarRepository.update(
        req.params.id,
        updatedCarData
      );

      res.json(updatedCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      // Retrieve the car to get its images
      const car = await CarRepository.findById(req.params.id);

      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      // Delete the related image files from the file system
      await deleteImages(car.images);

      // Delete the car from the database
      await CarRepository.delete(req.params.id);
      res.json({ message: "Car deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new CarController();
