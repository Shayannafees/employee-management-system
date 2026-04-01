const mongoose = require('mongoose');

async function connectDB() {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/CrudDB';
        await mongoose.connect(mongoURI);
        console.log("Mongodb connected successfully.")
    } catch (err) {
        console.error('MongoDB connection failed: ', err);
    }
}

connectDB();



// const mongoose = require('mongoose')
// async function connectDB(){
//     try {
//          await mongoose.connect(linktodb);
//      console.log(sdh sdh hvs);
//      catch (err){
//          console.log(mongsdkg sdfg sd, err);
//   }
//}}

//connectDB()