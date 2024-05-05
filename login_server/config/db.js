const mogo_url=require("dotenv").config();
const mongoose= require('mongoose');

mongoose
  .connect(process.env.mogo_url)
  .then(()=>{
    console.log('connection establish');
  })
  .catch((err)=>console.log(err));

// const { MongoClient } = require('mongodb')
// const mogo_url=require("dotenv").config();

// let dbConnection

// module.exports = {
//   connectToDb: (cb) => {
//     MongoClient.connect(process.env.mogo_url)
//       .then(client => {
//         console.log('connection establish');
//         dbConnection = client.db()
//         return cb()
//       })
//       .catch(err => {
//         console.log(err)
//         return cb(err)
//       })
//   },
//   getDb: () => dbConnection
// }