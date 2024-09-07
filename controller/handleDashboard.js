require("dotenv").config();
const {reminderExpiry} = require("./mailService");
const {membership} = require("../database/registeredUser");


function isMembershipExpiringSoon(expiryDate) {
    // Parse the expiry date string into a Date object
    const expiryDateObj = new Date(expiryDate);

    // Check if the expiry date is a valid date
    if (isNaN(expiryDateObj.getTime())) {
        console.error('Invalid expiry date');
        return false;
    }

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in time between the expiry date and current date
    const timeDifference = expiryDateObj - currentDate;

    // Calculate the difference in days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Check if the expiry is within 30, 15, 10, or 3 days
    if ((daysDifference <= 30 && daysDifference >= 0) || 
        (daysDifference <= 15 && daysDifference >= 0) || 
        (daysDifference <= 10 && daysDifference >= 0) || 
        (daysDifference <= 31 && daysDifference >= 0) ||
        (daysDifference <= 3 && daysDifference >= 0)) {
        return true;
    }

    // Check if the expiry date is within the current month
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const expiryMonth = expiryDateObj.getMonth();
    const expiryYear = expiryDateObj.getFullYear();

    if (expiryMonth === currentMonth && expiryYear === currentYear) {
        return true;
    }

    // If neither condition is met, return false
    return false;
}





const handleDashboard = async (req,res)=>{
        let cookie = req.cookies["status"];
        const data = await membership.find({})
        let arr = []
        for(i=0;i<data.length;i++)
        {
         if(isMembershipExpiringSoon(data[i]["expiry"])){
             arr.push(data[i])
         }
        }
        // console.log(cookie + "cookie");
        if(cookie)
        {
           
            for(i=0;i<arr.length;i++)
            {
                // console.log(arr[i]["gmail"],arr[i]["name"],arr[i]["expiry"])
               await reminderExpiry(arr[i]["gmail"],arr[i]["name"],arr[i]["expiry"])
            }
            res.render("dashboard",{
                gymName:process.env.gymName
            })
        }else{
            res.redirect("/");
        }
       
    
    
}

module.exports = {handleDashboard}