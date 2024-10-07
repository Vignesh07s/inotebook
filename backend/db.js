const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMingo = async () =>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err);
    });
}

module.exports = connectToMingo;//explain this