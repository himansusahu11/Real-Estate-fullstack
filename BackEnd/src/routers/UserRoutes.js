const express = require("express");

const {
  createUser,
  bookVisit,
  allBookings,
  cancelBooking,
  addToFev,
  allFev,
} = require("../controllers/userControllers");
const jwtCheck = require("../config/auth0Config");

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", allBookings);
router.post("/removeBookings/:id", jwtCheck, cancelBooking);
router.post("/addFev/:rid", jwtCheck, addToFev);
router.post("/allFev", jwtCheck, allFev);

module.exports = router;
