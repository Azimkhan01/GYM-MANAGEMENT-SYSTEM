const {membership} = require("../database/registeredUser");

const memberApi =async (req,res)=>{

let member  = await membership.find({});


   await  res.json(member);

    



}

module.exports = {memberApi};

