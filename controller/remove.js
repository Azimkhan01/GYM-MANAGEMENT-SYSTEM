require("dotenv").config();
const remove = (req, res) => {
  res.render("remove", {
    gymName: process.env.gymName,
  });
};

module.exports = { remove };
