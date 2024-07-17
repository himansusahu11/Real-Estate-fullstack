const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: { type: String },
  bookedVisits: { type: [Schema.Types.Mixed], default: [] },
  favResidenciesID: { type: [Schema.Types.ObjectId], default: [] },
  ownedResidencies: [{ type: Schema.Types.ObjectId, ref: "Residency" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
