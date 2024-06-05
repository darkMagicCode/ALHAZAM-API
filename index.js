const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb" }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const itemRoutes = require("./routes/itemRoutes.js");
const carRoutes = require("./routes/carRoutes.js");
app.use("/api/items", itemRoutes);
app.use("/api/cars", carRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
