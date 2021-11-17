const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const DailySaleSchema={
     totalamount:Number,
     date:String

}

const DailySales=mongoose.model("dailysale",DailySaleSchema);



module.exports=DailySales;