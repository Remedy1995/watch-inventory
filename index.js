const express=require('express');
const app=express();
<<<<<<< HEAD
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

=======
const md5=require('md5');
const PORT = process.env.PORT || 5000;
const path=require('path');
const time=require('./date');
const add=require('./Additems');
const data=require('./routes/data');
app.use('/',data);
require('dotenv').config()
var mongoose = require('mongoose');

//Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/inventory_system';
var mongoDB=process.env.MONGO_PASSWORD;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

//Get the default connection
var db = mongoose.connection;
if(db){
    console.log("you have succesfully connected to the database");
}
else{
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
>>>>>>> 37b0677c5888c22bfc462c0d31a7921a03532179
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(express.static('files'));
<<<<<<< HEAD
app.set('view engine', 'ejs');
const server = app.listen(PORT,()=>{
    console.log("you have successfully connected to the server at  ",PORT);
})
const io = socket(server);
const chat = require('./chatserver');
io.on('connection',chat.Chat);



=======

// set the view engine to ejs
app.set('view engine', 'ejs');
// app.get('/',(req,res)=>{
//     // res.sendFile(path.join(__dirname+'/index.html'));
//  res.render('pages/index');
// })

// time.date();
// time.SystemName();

app.listen(PORT,()=>{
    console.log("you have successfully connected to the server at  ",PORT);
// return time.date();

})


add('ama',1,2)

// app.get('/additems',(req,res)=>{
//     // res.sendFile(path.join(__dirname+'/index.html'));
//  res.render('pages/AddItems');
// })
//  app.post('/additems',(req,res)=>{
//     var itemname=req.body.itemname;
//     var itemprice=req.body.itemprice;
//     var  itemquantity=req.body.itemquantity;
//     //use our function add() to hold data;
// console.log(req.body.itemname)
//     add(itemname,itemprice,itemquantity);
//  })
console.log(md5("12345"))
>>>>>>> 37b0677c5888c22bfc462c0d31a7921a03532179
