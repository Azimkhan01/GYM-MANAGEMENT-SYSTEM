require('dotenv').config();

const handleAdmin = (req,res)=>{
    res.cookie('status', true, { maxAge: process.env.age, httpOnly: true });
    res.redirect("/dashboard");
    
    }
    
    module.exports = {handleAdmin}