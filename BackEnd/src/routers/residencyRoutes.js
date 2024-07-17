const express = require("express");

const {
  createResidency,
  getAllResidencies,
  getResidency,
  updateResidency,
} = require("../controllers/residencyControllers");
const jwtCheck = require("../config/auth0Config");

const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/allResidencies", getAllResidencies);
router.get("/:id", getResidency);
router.put("/update/:id", updateResidency);

module.exports = router;
