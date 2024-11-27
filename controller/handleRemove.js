let { membership } = require("../database/registeredUser");
require("dotenv").config();

const handleRemove = async (req, res) => {
  let id = req.body.id;
  let r = await membership.deleteOne({ id: id });
  // console.log(r)
  if (r) {
    res.render("remove", {
      gymName: process.env.gymName,
      status: "member remove succesfully",
    });
  } else {
    res.render("remove", {
      gymName: process.env.gymName,
      status: "member not remove",
    });
  }
};

module.exports = { handleRemove };
