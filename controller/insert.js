require("dotenv").config();

const insert = async (req,res)=>{
    
    res.render("insert",{
        gymName:process.env.gymName
    })
}

module.exports = {insert};