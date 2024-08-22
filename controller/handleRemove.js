let {membership} = require("../database/registeredUser")


const handleRemove =async (req,res)=>{
    let id = req.body.id
let r = await membership.deleteOne({id:id});
// console.log(r)
if(r)
{
    res.render("remove",{
        status:"member remove succesfully"
    }); 
}else{
    res.render("remove",{
        status:"member not remove"
    });
}
    
}

module.exports = {handleRemove};