const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticate");

const { create } = require("../controllers/createAgency-Client.js");
const { updateClient } = require("../controllers/updateClient.js");
const { getTopClients } = require("../controllers/getTopClients.js");
const { login } = require("../controllers/login");

router.post("/login", login);

router.post("/create-agency-client",authenticateToken, create);

router.put("/client/:clientId",authenticateToken, updateClient);

router.get("/top-clients",authenticateToken, getTopClients);

module.exports = router;
