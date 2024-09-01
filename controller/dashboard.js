require("dotenv").config()




const dashboard = async (req,res)=>{
        let cookie = req.cookies["status"];
       
        // console.log(cookie + "cookie");
        if(cookie)
        {
           
            res.render("dashboard",{
                gymName:process.env.gymName
            })
        }else{
            res.redirect("/");
        }
       
    
    
}

module.exports = {dashboard}