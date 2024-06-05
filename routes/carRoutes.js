const express = require("express");
const router = express.Router();
const multer = require("multer");
const CarController = require("../controllers/carController.js");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.get("/", CarController.getAll);
router.get("/:id", CarController.getById);

// Handle file upload and then call the create method
router.post("/", upload.array("images", 5), CarController.create);

router.put("/:id", CarController.update);
router.delete("/:id", CarController.delete);

module.exports = router;
