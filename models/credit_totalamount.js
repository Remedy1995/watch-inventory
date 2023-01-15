const mongoose = require('mongoose');

const TotalcreditSchema={
     customername:String,
     totalamount:Number,
     invoice:Number

}

const CreditAmounttotal=mongoose.model("creditamounttotal",TotalcreditSchema);



module.exports=CreditAmounttotal;