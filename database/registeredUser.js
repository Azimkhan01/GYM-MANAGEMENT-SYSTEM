const  mongoose = require('mongoose');
//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/vyneGym';
mongoose.connect(mongoDB).then(()=>{
    console.log("Connected to sql succesfully")
});

const registeredSchema = new mongoose.Schema({
    id:{
    type:String,
    trim:true
    },
    name:{
        type: String,
        trim: true,
    },
    whatsapp:{
        type: String,
        trim: true,
    },
    gmail:{
        type: String,
        trim: true,
    },membership_date:{
        type: String,
        trim: true,
    },membership_duration:{
        type: String,
        trim: true,
    },
    fees_paid:{
        type:String,
        trim:true,
    },expiry:{
        type:String,
        trim:true
    }
},
{
    timestamps: true,
    strict:false
}
);

const membership = mongoose.model("membership",registeredSchema );

module.exports = {membership};