const {membership} = require("../database/registeredUser");

const handleUpdate =async (req,res)=>{
    let name = await req.body.name
    let gmail = await req.body.gmail
    let membership_date = await req.body.membership_date;
    let membership_duration = await req.body.membership_duration;
    let fees_paid = await req.body.fees_paid;
    let whatsapp = await req.body.whatsapp;
let data =await  membership.updateOne({whatsapp:whatsapp},{name,gmail,membership_date,membership_duration,fees_paid});
  if(data)
  {
    res.render("update",{
        color:'green',
        status:`Update of ${name} is commited succesfully`
    })
  }else{
    res.render("update",{
        status:`update not happened `
    })
  }
    
}

module.exports = {handleUpdate};