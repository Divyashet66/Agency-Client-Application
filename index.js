const express = require("express");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const { Agency } = require("./models/agencySchema");
// const { Client } = require("./models/clientSchema");
const router=require('./routes/routes')
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const port = 3000;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use('/api',router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
