const {membership} = require("../database/registeredUser");
const {main , backup} = require("./mailService");
require("dotenv").config();
function getExpiry(startDate, duration) {
    const start = new Date(startDate);

    switch (duration) {
        case '1-month':
            start.setMonth(start.getMonth() + 1);
            break;
        case '3-months':
            start.setMonth(start.getMonth() + 3);
            break;
        case '6-months':
            start.setMonth(start.getMonth() + 6);
            break;
        case '1-year':
            start.setFullYear(start.getFullYear() + 1);
            break;
        default:
            console.error('Invalid duration');
            return null;
    }

    // Format the date as YYYY-MM-DD
    const expiryDate = start.toISOString().split('T')[0];
    return expiryDate;
}



const handleInsert = async (req,res)=>{
    
    let {name,whatsapp,gmail,membership_date,membership_duration,fees_paid,offer} =await  req.body;
    let find = await membership.find({whatsapp:whatsapp});
    if(find != undefined || find != "")
    {
        let id = await  membership.countDocuments({}) + 1;
        id = process.env.gymName+id;
        image = `/public/image/${id}.jpg`
        let expiry =await  getExpiry(membership_date,membership_duration);
        let insertMember = await  membership.create({id:id,name,whatsapp,gmail,membership_date,membership_duration,fees_paid,expiry:expiry,offer,image:image});
        
      
        if(insertMember)
        {
            let allD = await membership.find({});
            await backup(allD);
            await main(name,membership_date,membership_duration,expiry,gmail);
            res.render("insert",{
                color:'green',
                status:`${name} added in the ${process.env.gymName} gym membership`
            }); 
        }
    }else{
        res.render("insert",{
            gymName:process.env.gymName,
            color:'tomato',
            status:`${name} is already exist not inserted `
        }); 
    }
   
    
}

module.exports = {handleInsert};