const admin = (req,res)=>{
res.render("admin",{
    color:"#535353",
    status:"Kindly Enter Your Admin or Password"
});
}

module.exports = {admin}