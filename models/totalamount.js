const mongoose = require('mongoose');
require('@mongoosejs/double');
var SchemaTypes = mongoose.Schema.Types;
const TotalSchema={
     customername:String,
     totalamount:Number,
     invoice:Number,
     date:String

}

const TotalAmount=mongoose.model("totalamount",TotalSchema);



module.exports=TotalAmount;
