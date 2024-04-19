const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HardSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 10 },
  date: { type: Date, default: Date.now, required: true },
  time: { type: Number, required: true },
})

// Export model
module.exports = mongoose.model("Hard", HardSchema);
