require("dotenv").config();
const view = (req, res) => {
  res.render("view", {
    gymName: process.env.gymName,
  });
};

module.exports = { view };
