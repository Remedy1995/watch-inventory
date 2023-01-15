
const TotalAmount = require('../models/totalamount');
const Purchase=require('../models/purchases');
const Register=require('../models/registermodel');
exports.postSearch=(req,res)=>{
    var search=req.body.search;
 Purchase.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
     TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
     for(i=0;i<total.length;i++){
         var full=total[i].totalamount;
         var name=total[i].customername;
     }
     username=req.session.username;
   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
     var id=docs[i].id;
     var firstname=docs[i].firstname;
     var lastname=docs[i].lastname;
     var image=docs[i].image;
   }  
     res.render('pages/search',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
 })
     })
   })
}