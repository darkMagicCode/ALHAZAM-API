const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const itemRoutes = require("./routes/itemRoutes");
const carRoutes = require("./routes/carRoutes");
app.use("/api/items", itemRoutes);
app.use("/api/cars", carRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
