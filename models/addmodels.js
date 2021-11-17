const mongoose = require('mongoose');

const AdditemSchema={
    itemname:String,
    itemprice:Number,
     itemquantity:Number,
     pieceperquantity:Number,
     total:Number,
     date:String
}

const Add=mongoose.model("addItem",AdditemSchema);



module.exports=Add;