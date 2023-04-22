const { Agency } = require("../models/agencySchema");
const { Client } = require("../models/clientSchema");

exports.create = async (req, res) => {
  try {
    const { name, address1, state, city, phone_number } = req.body.agency;
    const { name: clientName, email, phone_number: clientPhoneNumber, total_bill } = req.body.client;
    if (!name || !address1 || !state || !city || !phone_number || !clientName || !email || !clientPhoneNumber || !total_bill) {
      return res.status(400).json({ error: "Missing required field(s)" });
    }
    //create Agency
    const agency = new Agency({ name, address1, address2: req.body.agency.address2, state, city, phone_number });
    await agency.save();

    //Create Client
    const client = new Client({ name: clientName, email, phone_number: clientPhoneNumber, total_bill, agency_id: agency._id });
    await client.save();

    res.status(201).json({ agency, client });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
