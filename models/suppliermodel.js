const mongoose = require('mongoose');

const SupplierSchema={
    suppliername:String,
    Phonenumber:Number,
     Items:String,
     
}

const Supplier=mongoose.model("suppliers",SupplierSchema);



module.exports=Supplier;