const mongoose = require('mongoose');
const RegisterSchema={
    firstname:String,
    lastname:String,
     username:String,
     password:String,
     password1:String,
     image:String
}



const Register=mongoose.model("register",RegisterSchema);

module.exports=Register;
