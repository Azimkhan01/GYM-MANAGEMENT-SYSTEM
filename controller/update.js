require("dotenv").config();
const update = (req, res) => {
  res.render("update", {
    gymName: process.env.gymName,
  });
};

module.exports = { update };
