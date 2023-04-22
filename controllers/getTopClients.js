const { Agency } = require("../models/agencySchema");
const { Client } = require("../models/clientSchema");

exports.getTopClients = async (req, res) => {
  try {
    const agencies = await Agency.find();
    // console.log(agencies);
    const topClients = await Promise.all(
      agencies.map(async (agency) => {
        const clients = await Client.find({ agency_id: agency._id }).sort({ total_bill: -1 }).limit(2);
        // console.log(clients);
        return {
          agency_name: agency.name,
          top_clients: clients.map((client) => ({ name: client.name, total_bill: client.total_bill })),
        };
      })
    );
    res.status(200).json(topClients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
