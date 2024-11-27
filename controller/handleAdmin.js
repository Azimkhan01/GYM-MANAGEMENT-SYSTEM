require("dotenv").config();

const handleAdmin = (req, res) => {
  res.cookie("status", true, { maxAge: process.env.age, httpOnly: true });
  let { admin, password } = req.body;
  console.log(admin, password);
  if (admin && password) {
    if (process.env.admin == admin && process.env.password == password)
      return res.redirect("/dashboard");
    else
      return res.render("admin", {
        status: "Admin Or Password Is Wrong",
        color: "tomato;transition: color 0.3s ease-in",
      });
  }
};

module.exports = { handleAdmin };
