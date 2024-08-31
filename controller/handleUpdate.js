const {membership} = require("../database/registeredUser");
require("dotenv").config()
const handleUpdate =async (req,res)=>{
    let name = await req.body.name
    let gmail = await req.body.gmail
    let membership_date = await req.body.membership_date;
    let membership_duration = await req.body.membership_duration;
    let fees_paid = await req.body.fees_paid;
    let whatsapp = await req.body.whatsapp;
    let offer = await req.body.offer;
    let image = await req.body.image;
    // console.log(req.body)
let data =await  membership.updateOne({whatsapp:whatsapp},{name:name,gmail:gmail,membership_date:membership_date,membership_duration:membership_duration,fees_paid:fees_paid,offer:offer,image:image});
// console.log(data)  
if(data)
  {
    res.render("update",{
        gymName:process.env.gymName,
        color:'green',
        status:`Update of ${name} is commited succesfully`
    })
  }else{
    res.render("update",{
      gymName:process.env.gymName,
        status:`update not happened `
    })
  }
    
}

module.exports = {handleUpdate};