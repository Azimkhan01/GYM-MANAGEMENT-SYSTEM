const {membership} = require("../database/registeredUser");

const memberApi =async (req,res)=>{

let member  = await membership.find({});


res.json(member);

}

module.exports = {memberApi};

