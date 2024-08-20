const {membership} = require("../database/registeredUser");
const {main} = require("./mailService");

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

function generateRandomId() {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    const randomId = `vyne-${randomNumber}`;
    return randomId;
}

const handleInsert = async (req,res)=>{
  
    let {name,whatsapp,gmail,membership_date,membership_duration,fees_paid} =await  req.body;
    let find = await membership.find({whatsapp:whatsapp});
    if(find != undefined || find != "")
    {
        let id = await generateRandomId();
        let expiry =await  getExpiry(membership_date,membership_duration);
        let insertMember = await  membership.create({id:id,name,whatsapp,gmail,membership_date,membership_duration,fees_paid,expiry:expiry});
        if(insertMember)
        {
            main(name,membership_date,membership_duration,expiry,gmail,true);
            res.render("insert",{
                color:'green',
                status:`${name} added in the vyne gym membership`
            }); 
        }
    }else{
        res.render("insert",{
            color:'tomato',
            status:`${name} is already exist not inserted `
        }); 
    }
   
    
}

module.exports = {handleInsert};