const dashboard = async (req,res)=>{
        let cookie = req.cookies["status"];
        console.log(cookie + "cookie");
        if(cookie)
        {
            res.render("dashboard")
        }else{
            res.redirect("/");
        }
       
    
    
}

module.exports = {dashboard}