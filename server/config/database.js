
const mongoose = require("mongoose");
require('dotenv').config();

exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connection is Successful."))
    .catch((error)=>{
        console.log("Issue in DB connection!");
        console.log(error);
        process.exit(1); 
    })
}