const Residency = require("../model/ResidencyModel");
const User = require("../model/UserModel");

const createResidency = async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Create the residency
    const residency = new Residency({
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
      owner: user._id, // Set the owner field to the user's ID
    });

    await residency.save();

    res.send({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res.status(400).send({
        message: "A residency with this address and user email already exists",
      });
    }
    res.status(500).send({ message: error.message });
  }
};

const getAllResidencies = async (req, res) => {
  try {
    const residencies = await Residency.find().sort({ createdAt: -1 });
    if (!residencies.length) {
      res.status(404).json({ message: "residency not found" });
    }
    res.status(200).json(residencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResidency = async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await Residency.findById(id);
    if (!residency) {
      res.status(404).json({ message: "residency  not found" });
    }
    res.status(200).json(residency);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateResidency = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const residency = await Residency.findById(id);

    if (!residency) {
      return res.status(404).send("Residency not found");
    }

    // Update the residency fields
    Object.assign(residency, updatedFields);

    // Save the updated residency
    const updatedResidency = await residency.save();

    res.status(200).send(updatedResidency);
  } catch (error) {
    res.status(500).send("Error updating residency");
    console.error("Error updating residency:", error);
  }
};

module.exports = {
  createResidency,
  getAllResidencies,
  getResidency,
  updateResidency,
};
