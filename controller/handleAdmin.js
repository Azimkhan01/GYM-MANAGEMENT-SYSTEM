const handleAdmin = (req,res)=>{
    res.cookie('status', true, { maxAge: 900000, httpOnly: true });
    res.redirect("/dashboard");
    
    }
    
    module.exports = {handleAdmin}