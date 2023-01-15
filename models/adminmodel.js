const mongoose = require('mongoose');
const AdminSchema={
    firstname:String,
    lastname:String,
     username:String,
     password:String,
     password1:String,
     image:String
}



const Admin=mongoose.model("admin",AdminSchema);

module.exports=Admin;
