const express=require('express');
const app=express();
const socket = require("socket.io");
const PORT = process.env.PORT || 5000;
const userMiddleware = require ('./middleware/user')
const time=require('./date');
const add=require('./Additems');
const data=require('./routes/data');
const sales=require('./routes/Sales');
app.use('/',data);
app.use('/',sales);
require('dotenv').config()
const mongoose = require('mongoose');
//Set up default mongoose connection
// const mongoDB = 'mongodb://127.0.0.1/inventory_system';
const mongoDB=process.env.MONGO_PASSWORD;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
try{
if(db){
    console.log("you have succesfully connected to the database");
}
}catch(error){
    console.log('There was an error connecting to the database',error)
}

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(express.static('files'));
app.set('view engine', 'ejs');
const server = app.listen(PORT,()=>{
    console.log("you have successfully connected to the server at  ",PORT);
})
const io = socket(server);
const chat = require('./chatserver');
io.on('connection',chat.Chat);



