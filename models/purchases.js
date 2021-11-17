const mongoose = require('mongoose');

const PurchaseSchema={
    invoice:Number,
    date:String,
     customername:String,
     itemname:String,
     quantity:Number,
     quantity1:Number,
     price:Number,
     totalamount:Number

}

const Purchase=mongoose.model("purchases",PurchaseSchema);



module.exports=Purchase;