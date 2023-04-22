const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

exports.login = (req, res) => {
  try {
    User.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.json({ auth: false, token: null, message: "Invalid password." });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 }); // expires in 24 hours
      res.status(200).json({ auth: true, token: token });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
