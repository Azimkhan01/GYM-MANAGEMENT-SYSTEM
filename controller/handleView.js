let {membership} = require("../database/registeredUser");
let {main} = require("./mailService");
function isExpired(expiryDate) {
        
    const now = new Date();
    const expiry = new Date(expiryDate);
    return expiry < now;
}
const  handleView =async (req,res)=>{
let data = await membership.find({});
for(i=0;i<data.length;i++)
{
    if(isExpired(data[i]["expiry"]))
    {
       await  main(data[i]["name"],data[i]["membership_date"],data[i]["membership_duration"],data[i]["expiry"],data[i]["gmail"],false);
    }
}
if(true)
{
    res.render("view",{
        status:"Mail sended",
        color:"green"
    }
    );
}else{
    res.render("view",{
        status:"mail send ",
        color:"red"
    }
    ); 
}

}

module.exports = { handleView};