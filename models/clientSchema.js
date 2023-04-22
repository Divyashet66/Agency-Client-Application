const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agency_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agency", required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  total_bill: { type: Number, required: true },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = { Client };
