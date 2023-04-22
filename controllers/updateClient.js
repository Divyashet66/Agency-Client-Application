const {Client} = require("../models/clientSchema");

exports.updateClient = async (req, res) => {
  try {
    const { name, email, phone_number, total_bill } = req.body;

    if (!name || !email || !phone_number || !total_bill) {
      return res.status(400).json({ error: "Missing required field(s)" });
    }
    console.log(req.params.clientId);
    const client = await Client.findByIdAndUpdate(req.params.clientId, { name, email, phone_number, total_bill }, { new: true });
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
