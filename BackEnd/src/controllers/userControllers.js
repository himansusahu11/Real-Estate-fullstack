const User = require("../model/UserModel");
const Residency = require("../model/ResidencyModel");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const bookVisit = async (req, res, next) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    // Check if the residency exists
    const residency = await Residency.findById(id);
    if (!residency) {
      return res.status(404).send({ message: "Residency not found" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Ensure bookedVisits is an array
    if (!user.bookedVisits) {
      user.bookedVisits = [];
    }

    // Check if the residency is already booked by the user
    if (user.bookedVisits.some((visit) => visit.id === id)) {
      return res
        .status(400)
        .send({ message: "This residency is already booked by you" });
    }

    // Update the user's bookedVisits field
    user.bookedVisits.push({ id, date });
    await user.save();

    res.send({ message: "Your visit is booked successfully" });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const allBookings = async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user by email and select only the bookedVisits field
    const user = await User.findOne({ email }, "bookedVisits");
    // Check if the user exists
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res
      .status(200)
      .send({ message: "Your all bookings", bookings: user.bookedVisits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure bookedVisits is initialized as an empty array
    if (!user.bookedVisits) {
      user.bookedVisits = [];
    }

    // Find the index of the booking to be canceled
    const index = user.bookedVisits.findIndex(
      (visit) => visit.id.toString() === id
    );

    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Remove the booking from the bookedVisits array
    user.bookedVisits.splice(index, 1);

    // Save the updated user document
    await user.save();

    res.send({ message: "Your booking is canceled successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addToFev = async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favResidenciesID.includes(rid)) {
      // If the residency is already in favorites, remove it
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $pull: { favResidenciesID: rid } },
        { new: true }
      );
      res.send({ message: "Removed from favorites", user: updatedUser });
    } else {
      // If the residency is not in favorites, add it
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $push: { favResidenciesID: rid } },
        { new: true }
      );
      res.send({ message: "Added to favorites", user: updatedUser });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const allFev = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email and select only the favResidenciesID field
    const user = await User.findOne({ email }, "favResidenciesID");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({
      message: "All favorites",
      favResidencies: user.favResidenciesID,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createUser,
  bookVisit,
  allBookings,
  cancelBooking,
  addToFev,
  allFev,
};
