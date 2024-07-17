const mongoose = require("mongoose");
const { Schema } = mongoose;

const residencySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, required: true },
  facilities: { type: Schema.Types.Mixed, required: true },
  userEmail: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

residencySchema.index({ address: 1, userEmail: 1 }, { unique: true });

const Residency = mongoose.model("Residency", residencySchema);
module.exports = Residency;
