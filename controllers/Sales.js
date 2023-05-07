const Add = require('../models/addmodels');
const Purchase=require('../models/purchases');
const TotalAmount = require('../models/totalamount');
const DailySales=require('../models/dailysales');
const model=require('../models/addmodels');
const Register=require('../models/registermodel');
const model1=require('../models/purchases');
const total=require('../models/totalamount');
const Admin=require('../models/adminmodel');
const totalStocksRetail = require ('../helper/remainingStocksRetail');
const totalStocksRemanining = require('../helper/remainingStocksWholeSale');
const todayDate=require('../date');
//make postsales route
exports.postSales=(req,res)=>{
  const invoice=req.body.invoice;
  const billdate=req.body.date;
  const customer_name=req.body.customer_name;
  const quantity=req.body.quantity;
  const quantity1=req.body.quantity1;
  const amount=parseFloat(req.body.amount);
  const price=parseFloat(req.body.price);
  const item=req.body.itemlist;
  if(invoice===""){
   req.flash('server-error',"please enter the invoice")
   res.redirect("/sales")
 }
else if(billdate===""){
  req.flash('server-error',"please update the time")
  res.redirect("/sales")
}
else if(item===""){
 req.flash('server-error',"please enter your item bought")
 res.redirect("/sales")
}
else if(customer_name===""){
  req.flash('server-error',"please enter your name")
  res.redirect("/sales")
}else if(quantity===""){
  req.flash('server-error',"please enter the quantity")
  res.redirect("/sales")
}else if(amount===""){
  req.flash('server-error',"please enter your amount")
  res.redirect("/sales")
}else if(price===""){
  req.flash('server-error',"please enter the price")
  res.redirect("/sales")
}
else{
   model();//call the database model
   total();//this is the total schema
  Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
       var checkquantity = docs[i].itemquantity;
       var quantityPerBox = docs[i].pieceperquantity;
       var quantityOfTotal = docs[i].total;
    }
      if(quantity <= checkquantity){
        console.log("you have more goods")
         //now subtract the quantity of goods sold from the existing quantity
         const remaining_quantity = checkquantity-(parseFloat(quantity));
        //subtract the stocks from the total  pieces of stocks remaining
       let remainingPiecesOfStocks = totalStocksRemanining(quantity,quantityPerBox,quantityOfTotal);
         const query = { itemname : item };
         const data = {itemquantity : remaining_quantity, total : remainingPiecesOfStocks };
       Add.updateOne(query,data,(err,collection) => {
           if(err) throw err;
           console.log("Record updated successfully");
           console.log(collection);
       })
       model1();
       const purchases=new Purchase(
           {
               invoice:invoice,
               date:billdate,
                customername:customer_name,
                itemname:item,
                quantity:quantity,
                quantity1:0,
                price:price,
                totalamount:amount   
           }
       )
       purchases.save();
//insert the total amount of cost of goods bought from a seller
   TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
           if(customer_name.length>1){
               for(i=0;i<docs.length;i++){
               var oldamount=docs[i].totalamount;
               var new_amount=parseFloat(oldamount)+parseFloat(amount); 
                   }    
           const query = { customername : customer_name };//check where there is an item and update
           const data = {totalamount : new_amount}
         TotalAmount.updateOne(query,data,(err,collection) => {
             if(err) throw err;
             console.log("Record updated successfully");
             console.log(collection);
         })
         TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
           if(docs.length<1) {
                  
       const total1=new TotalAmount({
       customername:customer_name,
        totalamount:amount,
        invoice:invoice,
        date:billdate  
   })
   total1.save()
 } })
 }  })
DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
  // console.log(docs)
  if(billdate.length>1){
      for(i=0;i<docs.length;i++){
      var oldamount=docs[i].totalamount;
      var new_amount=parseFloat(oldamount)+parseFloat(amount);  
          }      
  const query = {date : billdate };//check where there is an item and update
  const data = {totalamount : new_amount}
DailySales.updateOne(query,data,(err,collection) => {
    if(err) throw err;
    console.log("Record updated successfully");
    console.log(collection);
})
DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
  if(docs.length<1) {
         
    const daily=new DailySales({
     totalamount:amount,
      date:billdate  
    })
     daily.save(); //save the dailysale
} })
}  })
req.flash('server-success',"You have sucessfully made purchases");
       res.redirect("/sales")
    }else{
        console.log("you have to top up");
        req.flash('server-error',"you have to top up  stocks to make sales");
        res.redirect("/sales")
    } 
  })
 }
}
//get sales route
exports.getSales=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
    model();
   const username=req.session.username;
    Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
      var id=docs[i].id;
      var firstname=docs[i].firstname;
      var lastname=docs[i].lastname;
      var image=docs[i].image;
    }
    const invoice=Math.random().toString().substring(4,12);
    Add.find({},function(err,sales){
       todayDate()//for the date
    var getDate=todayDate();
  res.render('pages/sales',{sales:sales,getDate:getDate,invoice:invoice,lastname:lastname,
  firstname:firstname,image:image,id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});   
})     
})

}
//make retail sales
exports.postRetail=(req,res)=>{
  const invoice=req.body.invoice;
  const billdate=req.body.date;
  const customer_name=req.body.customer_name;
  const quantity1=req.body.quantity1;
  const quantity=req.body.quantity;
  const amount=req.body.amount;
  const price=req.body.price;
  const item=req.body.itemlist;
  if(invoice===""){
   req.flash('server-error',"please enter the invoice")
   res.redirect("/retail")
 }
else if(billdate===""){
  req.flash('server-error',"please update the time")
  res.redirect("/retail")
}
else if(item===""){
 req.flash('server-error',"please enter your item bought")
 res.redirect("/retail")
}
else if(customer_name===""){
  req.flash('server-error',"please enter your name")
  res.redirect("/retail")
}else if(quantity1===""){
  req.flash('server-error',"please enter the quantity")
  res.redirect("/retail")
}else if(amount===""){
  req.flash('server-error',"please enter your amount")
  res.redirect("/retail")
}else if(price===""){
  req.flash('server-error',"please enter the price")
  res.redirect("/retail")
}
else{
   model();//call the database model
   total();//this is the total schema
  Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
       var checktotal = docs[i].total;
      var itemquantity = docs[i].itemquantity;
    }
    if(quantity1<=checktotal){
        console.log("you have more goods")
     //now subtract the quantity entered from the existing quantity

       //subtract remaining stocks
    let remainingOfStocks = totalStocksRetail(itemquantity,quantity1);

         var remaining_quantity=checktotal-(parseFloat(quantity1));
         console.log(remaining_quantity);
         var query = { itemname : item};
         var data = {total : remaining_quantity,itemquantity:remainingOfStocks }
       Add.updateOne(query,data,(err,collection) => {
           if(err) throw err;
           console.log("Record updated successfully");
           console.log(collection);
       })
       //call the purchases function
       model1();
       const purchases=new Purchase(
           {
               invoice:invoice,
               date:billdate,
               customername:customer_name,
               itemname:item,
                quantity1:quantity1,
                quantity:0,
                price:price,
                totalamount:amount   
           }
       )
       purchases.save();
//insert the total amount of cost of goods bought from a seller
   TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
           if(customer_name.length>1){
               for(i=0;i<docs.length;i++){
              var oldamount=docs[i].totalamount;
               var new_amount=parseFloat(oldamount)+parseFloat(amount); 
                   }   
           var query = { customername : customer_name };//check where there is an item and update
           var data = {totalamount : new_amount}
         TotalAmount.updateOne(query,data,(err,collection) => {
             if(err) throw err;
             console.log("Record updated successfully");
             console.log(collection);
         })
         TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
           if(docs.length<1) {               
  const total1=new TotalAmount({
       customername:customer_name,
        totalamount:amount,
        invoice:invoice,
        date:billdate 
   })
   total1.save()}})}})
   DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
    if(billdate.length>1){
        for(i=0;i<docs.length;i++){
       var oldamount=docs[i].totalamount;
        var new_amount=parseFloat(oldamount) +parseFloat(amount); 
            }    
    var query = {date : billdate };//check where there is an item and update
    var data = {totalamount : new_amount}
  DailySales.updateOne(query,data,(err,collection) => {
      if(err) throw err;
      console.log("Record updated successfully");
      console.log(collection);
  })
  DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
    if(docs.length<1) {
      const daily=new DailySales({
       totalamount:amount,
        date:billdate  
      })
       daily.save(); //save the dailysale
  }})
  }})
req.flash('server-success',"You have sucessfully made purchases");
       res.redirect("/retail")
    }else{
        console.log("you have to top up");
        req.flash('server-error',"you have to top up  stocks to make sales");
        res.redirect("/retail")
    }
  })
 }
}

//get retail sales

exports.getRetail=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
      model();
      username=req.session.username;
      Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      for(i=0;i<docs.length;i++){
        var id=docs[i].id;
        var firstname=docs[i].firstname;
        var lastname=docs[i].lastname;
        var image=docs[i].image;
      }
      const invoice=Math.random().toString().substring(4,12);
      Add.find({},function(err,sales){
      var getDate=todayDate();
    res.render('pages/retail',{sales:sales,getDate:getDate,invoice:invoice,lastname:lastname,
    firstname:firstname,image:image,id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
          })   
    })
}

exports.adminGetDailySales=(req,res)=>{

  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  username=req.session.username;
  Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  for(i=0;i<docs.length;i++){
    var id=docs[i].id;
    var firstname=docs[i].firstname;
    var lastname=docs[i].lastname;
    var image=docs[i].image;
  }
  res.render("pages/admindailysales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),id:id,firstname:firstname,lastname:lastname,image:image})
})
}

exports.getDailySales=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
    username=req.session.username;
    Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
    for(i=0;i<docs.length;i++){
      var id=docs[i].id;
      var firstname=docs[i].firstname;
      var lastname=docs[i].lastname;
      var image=docs[i].image;
    }
    res.render("pages/dailysales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),id:id,firstname:firstname,lastname:lastname,image:image})
  })
}


