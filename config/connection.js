const mongoose = require('mongoose');
const connectDB = async ()=>{
    var conn = await mongoose.connect(process.env.MONGO_URI_LOCAL);
    
    console.log(`MongoDB connected : ${conn.connection.host}`)
} 

module.exports = connectDB