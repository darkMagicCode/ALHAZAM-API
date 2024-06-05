const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
