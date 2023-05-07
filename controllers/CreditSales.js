const Add = require('../models/addmodels');
const Register=require('../models/registermodel');
const todayDate=require('../date');
const CreditAmounttotal = require('../models/credit_totalamount');
const Creditsales=require('../models/creditsales');
const model=require('../models/addmodels');
const total=require('../models/totalamount');

exports.getCreditSales=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
    const invoice=Math.random().toString().substring(4,12);
    Add.find({},function(err,sales){
       //get the current date
       todayDate()//for the date
    var getDate=todayDate();
    username=req.session.username;
    Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
      var id=docs[i].id;
      var firstname=docs[i].firstname;
      var lastname=docs[i].lastname;
      var image=docs[i].image;
    }
  res.render('pages/creditsales',{sales:sales,getDate:getDate,invoice:invoice,firstname:firstname,lastname:lastname,image:image,id:id,
    serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
         })
})
}

exports.getCreditRetailSales=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
        const invoice=Math.random().toString().substring(4,12);
        Add.find({},function(err,sales){
           //get the current date
           todayDate()//for the date
        var getDate=todayDate();
        username=req.session.username;
        Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      
        for(i=0;i<docs.length;i++){
          var id=docs[i].id;
          var firstname=docs[i].firstname;
          var lastname=docs[i].lastname;
          var image=docs[i].image;
        }
      res.render('pages/creditretailsales',{sales:sales,getDate:getDate,invoice:invoice,firstname:firstname,lastname:lastname,image:image,id:id,
        serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
             })
      })
      
}


exports.postCreditSales=(req,res)=>{
   var invoice=req.body.invoice;
   var billdate=req.body.date;
   var customer_name=req.body.customer_name;
   var quantity=req.body.quantity;
   var amount=parseFloat(req.body.amount);
   var price=parseFloat(req.body.price);
   var item=req.body.itemlist;
   if(invoice===""){
    req.flash('server-error',"please enter the invoice")
    res.redirect("/creditsales")
  }
 else if(billdate===""){
   req.flash('server-error',"please update the time")
   res.redirect("/creditsales")
 }
 else if(item===""){
  req.flash('server-error',"please enter your item bought")
  res.redirect("/creditsales")
}
 else if(customer_name===""){
   req.flash('server-error',"please enter your name")
   res.redirect("/creditsales")
 }else if(quantity===""){
   req.flash('server-error',"please enter the quantity")
   res.redirect("/creditsales")
 }else if(amount===""){
   req.flash('server-error',"please enter your amount")
   res.redirect("/creditsales")
 }else if(price===""){
   req.flash('server-error',"please enter the price")
   res.redirect("/creditsales")
 }
else{
    model();//call the database model
    total();//this is the total schema
   Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){

     for(i=0;i<docs.length;i++){
        var checkquantity=docs[i].itemquantity;
     }
     if(quantity<=checkquantity){
         console.log("you have more goods")

      //now subtract the quantity entered from the existing quantity
          var remaining_quantity=checkquantity-(parseFloat(quantity));
          console.log(remaining_quantity);
          var query = { itemname : item };
          var data = {itemquantity : remaining_quantity }
        Add.updateOne(query,data,(err,collection) => {
            if(err) throw err;
            console.log("Record updated successfully");
            console.log(collection);
        })
        //call the purchases function
        const creditsales=new Creditsales(
            {
                invoice:invoice,
                date:billdate,
                 customername:customer_name,
                 itemname:item,
                 quantity:quantity,
                 price:price,
                 totalamount:amount   
            }
        )
        creditsales.save();
//insert the total amount of cost of goods bought from a seller
    CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
            // console.log(docs)
            if(customer_name.length>1){
                for(i=0;i<docs.length;i++){
               var oldamount= (docs[i].totalamount);
                var new_amount=parseFloat(oldamount)+parseFloat(amount);
                    }  
            var query = { customername : customer_name };//check where there is an item and update
            var data = {totalamount : new_amount}
            CreditAmounttotal.updateOne(query,data,(err,collection) => {
              if(err) throw err;
              console.log("Record updated successfully");
              console.log(collection);
          })
          CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
            if(docs.length<1) {
                   
   const total1=new CreditAmounttotal({
        customername:customer_name,
         totalamount:amount,
         invoice:invoice   
    })
    total1.save()
            }
  }) }})
req.flash('server-success',"You have successfully credited stocks");
        res.redirect("/creditsales")
     }else{
         console.log("you have to top up");
         req.flash('server-error',"Top up stocks before you can proceed to credit");
         res.redirect("/creditsales")
     } 
   }) 
  }
}


exports.postCreditRetailSales=(req,res)=>{
        var invoice=req.body.invoice;
        var billdate=req.body.date;
        var customer_name=req.body.customer_name;
        var quantity1=req.body.quantity1;
        var quantity=req.body.quantity;
        var amount=parseFloat(req.body.amount);
        var price=parseFloat(req.body.price);
        var item=req.body.itemlist;
        if(invoice===""){
         req.flash('server-error',"please enter the invoice")
         res.redirect("/creditretailsales")
       }
      else if(billdate===""){
        req.flash('server-error',"please update the time")
        res.redirect("/creditretailsales")
      }
      else if(item===""){
       req.flash('server-error',"please enter your item bought")
       res.redirect("/creditretailsales")
      }
      else if(customer_name===""){
        req.flash('server-error',"please enter your name")
        res.redirect("/creditretailsales")
      }else if(quantity1===""){
        req.flash('server-error',"please enter the items")
        res.redirect("/creditretailsales")
      }else if(amount===""){
        req.flash('server-error',"please enter your amount")
        res.redirect("/creditretailsales")
      }else if(price===""){
        req.flash('server-error',"please enter the price")
        res.redirect("/creditretailsales")
      }
      else{
         model();//call the database model
         total();//this is the total schema
        Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){
      
          for(i=0;i<docs.length;i++){
              var checktotal=docs[i].total;
          }
          if(quantity1<=checktotal){
              console.log("you have more goods")
      
           //now subtract the quantity entered from the existing quantity
                var remaining_quantity=checktotal-(parseFloat(quantity1));
               console.log(remaining_quantity);
               var query = { itemname : item };
               var data = {total : remaining_quantity }
             Add.updateOne(query,data,(err,collection) => {
                 if(err) throw err;
                 console.log("Record updated successfully");
                 console.log(collection);
             })
      
             //call the purchases function
             model2();
             const creditsales=new Creditsales(
                 {
                     invoice:invoice,
                     date:billdate,
                      customername:customer_name,
                      itemname:item,
                      quantity:0,
                      quantity1:quantity1,
                      price:price,
                      totalamount:amount   
                 }
             )
             creditsales.save();
      //insert the total amount of cost of goods bought from a seller
         CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
                 // console.log(docs)
                 if(customer_name.length>1){
                     for(i=0;i<docs.length;i++){
                    var oldamount= (docs[i].totalamount);
                     var new_amount=parseFloat(oldamount)+parseFloat(amount);   
                         }    
                 var query = { customername : customer_name };//check where there is an item and update
                 var data = {totalamount : new_amount}
                 CreditAmounttotal.updateOne(query,data,(err,collection) => {
                   if(err) throw err;
                   console.log("Record updated successfully");
                   console.log(collection);
               })
               CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
                 if(docs.length<1) {
                        
        const total1=new CreditAmounttotal({
             customername:customer_name,
              totalamount:amount,
              invoice:invoice   
         })
         total1.save()
                 }
                 })}      
         }) 
      req.flash('server-success',"You have successfully credited stocks");
             res.redirect("/creditretailsales")
      
          }else{
              console.log("you have to top up");
              req.flash('server-error',"Top up stocks before you can proceed to credit");
              res.redirect("/creditretailsales")
          }    
        })     
       }    
}