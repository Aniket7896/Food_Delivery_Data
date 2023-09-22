const mongoose=require("mongoose")
require("dotenv").config();
const connection = mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err)
});

module.exports={connection}