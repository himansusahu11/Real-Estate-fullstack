const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/UserRoutes");
const residencyRoutes = require("./routers/residencyRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Load environment variables from .env file
dotenv.config();

const { PORT, DATABASE_URL } = process.env;

console.log(DATABASE_URL);

mongoose
  .connect(DATABASE_URL)
  .then((connection) => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  // Remove COOP/COEP headers for testing purposes
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/residency", residencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
