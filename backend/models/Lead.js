const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, default: "Unknown" },
  probability: { type: Number, default: 0 },
  status: { type: String, enum: ["Verified", "To Check"], required: true },
  synced: { type: Boolean, default: false },
});

module.exports = mongoose.model("Lead", leadSchema);
