const Creditsales=require('../models/creditsales');
const Register=require('../models/registermodel');
const TotalAmount = require('../models/totalamount');
const Admin=require('../models/adminmodel');
exports.searchDebtors=(req,res)=>{
    var search=req.body.search;
  Creditsales.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){ 
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
    
     res.render('pages/searchdebtorspage',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
  })
   
}) 
  })

}

exports.allDebtors=(req,res)=>{
        var search=req.body.search;
      Creditsales.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
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
        
         res.render('pages/alldebtorsadmin',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
      })
         })
       })
}


exports.getAllDebtors=(req,res)=>{
            Creditsales.find({},function(err,purchase,purchase1){
               username=req.session.username;
               Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
             
               for(i=0;i<docs.length;i++){
                 var id=docs[i].id;
                 var firstname=docs[i].firstname;
                 var lastname=docs[i].lastname;
                 var image=docs[i].image;
               }
                res.render('pages/alldebtors',{purchase:purchase,firstname:firstname,lastname:lastname,image:image,id:id});
            })
        })
}

exports.getDebtorsInformation=(req,res)=>{
        var username=req.session.username;
          Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
            for(i=0;i<docs.length;i++){ 
              var firstname=docs[i].firstname;
              var lastname=docs[i].lastname;
              var image=docs[i].image;
          }
            var id=req.params.id;
            Creditsales.findById(id,function(err,information){
                var price=information.price;
                var invoice=information.invoice;
                var name=information.customername;
                var date=information.date;
                var quantity=information.quantity;
                var quantity1=information.quantity1;
                var amount=information.totalamount;
                var item=information.itemname;
                res.render('pages/debtorsinformation',{information:information,price:price,name:name,invoice:invoice,date:date,item:item,amount:amount,
                  quantity:quantity,quantity1:quantity1,
                firstname:firstname,lastname:lastname,image:image,id:id});
            })
        })
}


exports.getDebtorsEdit=(req,res)=>{
        var username=req.session.username;
          Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
            for(i=0;i<docs.length;i++){ 
              var firstname=docs[i].firstname;
              var lastname=docs[i].lastname;
              var image=docs[i].image;
          }
            var id=req.params.id;
             model();
             Add.find({},function(err,sales){
           res.render('pages/debtorsedit',{sales:sales,id:id,firstname:firstname,lastname:lastname,image:image,
            serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
                   })         
         })
}


exports.postDebtorsEdit=(req,res)=>{
        var id=req.params.id;//get the id 
        var invoice=req.body.invoice;
        var billdate=req.body.date;
        var customer_name=req.body.customer_name;
        var quantity=parseFloat(req.body.quantity);
        var quantity1=parseFloat(req.body.quantity1);
        var amount=parseFloat(req.body.amount);
        var price=parseFloat(req.body.price);
        var item=req.body.itemlist;
        if(invoice===""){
          req.flash('server-error',"please enter the invoice")
          res.redirect("/debtorsedit"+id)
        }
       else if(billdate===""){
         req.flash('server-error',"please update the time")
         res.redirect("/debtorsedit"+id)
       }
       else if(item===""){
        req.flash('server-error',"please enter your item bought")
        res.redirect("/debtorsedit"+id)
      }
       else if(customer_name===""){
         req.flash('server-error',"please enter your name")
         res.redirect("/debtorsedit"+id)
       }else if(quantity===""){
         req.flash('server-error',"please enter the number of boxes")
         res.redirect("/debtorsedit"+id)
       }else if(quantity1===""){
        req.flash('server-error',"please enter the number of boxes")
        res.redirect("/debtorsedit"+id)
      }
       else if(amount===""){
         req.flash('server-error',"please enter your amount")
         res.redirect("/debtorsedit"+id)
       }else if(price===""){
         req.flash('server-error',"please enter the price")
         res.redirect("/debtorsedit"+id)
       }
      else{
         Creditsales.findByIdAndUpdate(id, { invoice:invoice,date:billdate,customername:customer_name,itemname:item,quantity:quantity,quantity1:quantity1,totalamount:amount,price:price}, 
                                         function (err, docs) {                          
                 if (err){ 
                     console.log(err) 
                 } 
                 else{ 
                   
                 } 
                 req.flash('server-success',"You have updated your information successfully")
                 console.log("information inserted successfully");
                 res.redirect("/debtorsedit"+id);
             });  
            }
}


exports.debtorsDelete=(req,res)=>{
      Creditsales.findByIdAndDelete(req.params.id, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
            res.redirect("/alldebtors")
    })

}