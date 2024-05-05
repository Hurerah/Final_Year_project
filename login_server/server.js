const express= require('express');
const app=require('express')();
app.use(express.json());
const port=3000;
const { getDb, connectToDb } = require('./config/db')

const router= require('./api/user_router')
//db = getDb()
app.use('/user',router);
app.listen(port,()=>{
  console.log(`Server is connected to port ${port}`)
})