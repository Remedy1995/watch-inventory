const mongoose = require('mongoose');

const CreditSchema={
    invoice:Number,
    date:String,
     customername:String,
     itemname:String,
     quantity:Number,
     quantity1:Number,
     price:Number,
     totalamount:Number

}

const CreditSales=mongoose.model("creditsales",CreditSchema);



module.exports=CreditSales;