var express = require('express');
var router = express.Router();

var add=require('../Additems');
const see=require('../try');
const DailySales=require('../models/dailysales');
const model=require('../models/addmodels');
const total=require('../models/totalamount');
const credittotalamount=require('../models/credit_totalamount');
const bodyparser = require('body-parser');
const Add = require('../models/addmodels');
const todayDate=require('../date');
const url = require('url');
const { setMaxListeners } = require('../models/addmodels');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
const Purchase=require('../models/purchases');
const model1=require('../models/purchases');
const TotalAmount = require('../models/totalamount');
const CredittotalAmount = require('../models/credit_totalamount');
const Creditsales=require('../models/creditsales');
const model2=require('../models/creditsales');
const CreditAmounttotal = require('../models/credit_totalamount');
const Supplier=require('../models/suppliermodel');
const Register=require('../models/registermodel');
const Admin=require('../models/adminmodel');
const fileUpload = require("express-fileupload");
const session=require("express-session");
const flash=require("connect-flash");
router.use(flash());

var sess;
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
const md5=require("md5");
const path=require('path');
router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }));
todayDate()
console.log(model())
// console.log(purchase())
var getDate=todayDate();//get the date
console.log(getDate)



// router.get('/', function (req, res) {
//   res.render('pages/signupandsignin',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
// })

// router.get('/sales', function (req, res) {

//     model();

//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//     const invoice=Math.random().toString().substring(4,12);
//     Add.find({},function(err,sales){
//        //get the current date
//        todayDate()//for the date
//     var getDate=todayDate();
//   res.render('pages/sales',{sales:sales,getDate:getDate,invoice:invoice,lastname:lastname,
//   firstname:firstname,image:image,id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
        
        
//         })
      
// })
// })



// router.get('/retail', function (req, res) {

//   model();

//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//   const invoice=Math.random().toString().substring(4,12);
//   Add.find({},function(err,sales){
//      //get the current date
//      todayDate()//for the date
//   var getDate=todayDate();
// res.render('pages/retail',{sales:sales,getDate:getDate,invoice:invoice,lastname:lastname,
// firstname:firstname,image:image,id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
      
      
//       })
    
// })
// })

// router.post('/admindailysales',function(req,res){
//   const date =req.body.date;
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//   DailySales.find({'date' : new RegExp(date, 'i')}, function(err, docs){
//    if(docs<1){
//     req.flash('server-error',"Please you have no  sales for this day ");
//      console.log("you have no  sales for the day")
//      return res.render("pages/adminnosales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),image:image,firstname:firstname,lastname:lastname,id:id,date:date})
//    }else{
//      console.log(" yes")
//       for(i=0;i<docs.length;i++)  {
//         var totalamount=docs[i].totalamount;
//         var date=docs[i].date;
//       }  
//       console.log(totalamount)
//       console.log(date) 
//    }
//       res.render("pages/adminviewsales",{date:date,totalamount:totalamount,firstname:firstname,lastname:lastname,image:image,id:id
//       , serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
  
//     })
     
//   })
//   })
  






// router.post('/dailysales',function(req,res){
// const date =req.body.date;
// username=req.session.username;
// Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

// for(i=0;i<docs.length;i++){
//   var id=docs[i].id;
//   var firstname=docs[i].firstname;
//   var lastname=docs[i].lastname;
//   var image=docs[i].image;
// }
// DailySales.find({'date' : new RegExp(date, 'i')}, function(err, docs){
//  if(docs<1){
//   req.flash('server-error',"Please you have no  sales for this day ");
//    console.log("you have no  sales for the day")
//    return res.render("pages/nosales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),image:image,firstname:firstname,lastname:lastname,id:id,date:date})
//  }else{
//    console.log(" yes")
//     for(i=0;i<docs.length;i++)  {
//       var totalamount=docs[i].totalamount;
//       var date=docs[i].date;
//     }  
//     console.log(totalamount)
//     console.log(date) 
//  }
//     res.render("pages/viewsales",{date:date,totalamount:totalamount,firstname:firstname,lastname:lastname,image:image,id:id
//     , serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})

//   })
   
// })
// })




// router.post('/sales', function (req, res) {
//   var invoice=req.body.invoice;
//   var billdate=req.body.date;
//   var customer_name=req.body.customer_name;
//   var quantity=req.body.quantity;
//   var quantity1=req.body.quantity1;
//   var amount=parseFloat(req.body.amount);
//   var price=parseFloat(req.body.price);
//   var item=req.body.itemlist;
 
//   if(invoice===""){
//    req.flash('server-error',"please enter the invoice")
//    res.redirect("/sales")
//  }
// else if(billdate===""){
//   req.flash('server-error',"please update the time")
//   res.redirect("/sales")
// }
// else if(item===""){
//  req.flash('server-error',"please enter your item bought")
//  res.redirect("/sales")
// }
// else if(customer_name===""){
//   req.flash('server-error',"please enter your name")
//   res.redirect("/sales")
// }else if(quantity===""){
//   req.flash('server-error',"please enter the quantity")
//   res.redirect("/sales")
// }else if(amount===""){
//   req.flash('server-error',"please enter your amount")
//   res.redirect("/sales")
// }else if(price===""){
//   req.flash('server-error',"please enter the price")
//   res.redirect("/sales")
// }
// else{
//    model();//call the database model
//    total();//this is the total schema
   
//   Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
//        var checkquantity=docs[i].itemquantity;
//     }
//     if(quantity<=checkquantity){
//         console.log("you have more goods")

//      //now subtract the quantity entered from the existing quantity
//          var remaining_quantity=checkquantity-(parseFloat(quantity));
//          console.log(remaining_quantity);
//          var query = { itemname : item };
//          var data = {itemquantity : remaining_quantity }
//        Add.updateOne(query,data,(err,collection) => {
//            if(err) throw err;
//            console.log("Record updated successfully");
//            console.log(collection);
//        })

//        //call the purchases function
//        model1();
//        const purchases=new Purchase(
//            {
//                invoice:invoice,
//                date:billdate,
//                 customername:customer_name,
//                 itemname:item,
//                 quantity:quantity,
//                 quantity1:0,
//                 price:price,
//                 totalamount:amount   
//            }
//        )
//        purchases.save();

// //insert the total amount of cost of goods bought from a seller
//    TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//            // console.log(docs)
//            if(customer_name.length>1){
//                for(i=0;i<docs.length;i++){
//                //     var existing_item=docs[i].itemquantity;
//                //     console.log(existing_item)
//                // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//                // console.log(new_items)
//               var oldamount=docs[i].totalamount;
//                var new_amount=parseFloat(oldamount)+parseFloat(amount);
                   
//                    }
                   
//            var query = { customername : customer_name };//check where there is an item and update
//            var data = {totalamount : new_amount}
//          TotalAmount.updateOne(query,data,(err,collection) => {
//              if(err) throw err;
//              console.log("Record updated successfully");
//              console.log(collection);
//          })
//          TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//            if(docs.length<1) {
                  
//        const total1=new TotalAmount({
//        customername:customer_name,
//         totalamount:amount,
//         invoice:invoice,
//         date:billdate  
//    })
//    total1.save()
//  } })
//  }  })


// // ///
// DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
//   // console.log(docs)
//   if(billdate.length>1){
//       for(i=0;i<docs.length;i++){
//       //     var existing_item=docs[i].itemquantity;
//       //     console.log(existing_item)
//       // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//       // console.log(new_items)
//      var oldamount=docs[i].totalamount;
//       var new_amount=parseFloat(oldamount)+parseFloat(amount);
          
//           }
          
//   var query = {date : billdate };//check where there is an item and update
//   var data = {totalamount : new_amount}
// DailySales.updateOne(query,data,(err,collection) => {
//     if(err) throw err;
//     console.log("Record updated successfully");
//     console.log(collection);
// })
// DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
//   if(docs.length<1) {
         
//     const daily=new DailySales({
//      totalamount:amount,
//       date:billdate  
//     })
//      daily.save(); //save the dailysale
// } })
// }  })









   
    
   
// // const daily=new DailySales({
   
// //   totalamount:amount,
// //   date:billdate  
// // })
// //  daily.save(); //save the dailysale

// req.flash('server-success',"You have sucessfully made purchases");
//        res.redirect("/sales")

//     }else{
//         console.log("you have to top up");
//         req.flash('server-error',"you have to top up  stocks to make sales");
//         res.redirect("/sales")
//     }
   
//   })
  
//  }
//    // res.render('pages/AddItems');
// })







// router.post('/retail', function (req, res) {
//   var invoice=req.body.invoice;
//   var billdate=req.body.date;
//   var customer_name=req.body.customer_name;
//   var quantity1=req.body.quantity1;
//   var quantity=req.body.quantity;
//   var amount=req.body.amount;
//   var price=req.body.price;
//   var item=req.body.itemlist;
 
//   if(invoice===""){
//    req.flash('server-error',"please enter the invoice")
//    res.redirect("/retail")
//  }
// else if(billdate===""){
//   req.flash('server-error',"please update the time")
//   res.redirect("/retail")
// }
// else if(item===""){
//  req.flash('server-error',"please enter your item bought")
//  res.redirect("/retail")
// }
// else if(customer_name===""){
//   req.flash('server-error',"please enter your name")
//   res.redirect("/retail")
// }else if(quantity1===""){
//   req.flash('server-error',"please enter the quantity")
//   res.redirect("/retail")
// }else if(amount===""){
//   req.flash('server-error',"please enter your amount")
//   res.redirect("/retail")
// }else if(price===""){
//   req.flash('server-error',"please enter the price")
//   res.redirect("/retail")
// }
// else{
//    model();//call the database model
//    total();//this is the total schema
//   Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
//        var checktotal=docs[i].total;
//     }
//     if(quantity1<=checktotal){
//         console.log("you have more goods")

//      //now subtract the quantity entered from the existing quantity
//          var remaining_quantity=checktotal-(parseFloat(quantity1));
//          console.log(remaining_quantity);
//          var query = { itemname : item };
//          var data = {total : remaining_quantity }
//        Add.updateOne(query,data,(err,collection) => {
//            if(err) throw err;
//            console.log("Record updated successfully");
//            console.log(collection);
//        })

//        //call the purchases function
//        model1();
//        const purchases=new Purchase(
//            {
//                invoice:invoice,
//                date:billdate,
//                 customername:customer_name,
//                 itemname:item,
//                 quantity1:quantity1,
//                 quantity:0,
//                 price:price,
//                 totalamount:amount   
//            }
//        )
//        purchases.save();

// //insert the total amount of cost of goods bought from a seller
//    TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//            // console.log(docs)
//            if(customer_name.length>1){
//                for(i=0;i<docs.length;i++){
//                //     var existing_item=docs[i].itemquantity;
//                //     console.log(existing_item)
//                // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//                // console.log(new_items)
//               var oldamount=docs[i].totalamount;
//                var new_amount=parseFloat(oldamount)+parseFloat(amount);
                   
//                    }
                   
//            var query = { customername : customer_name };//check where there is an item and update
//            var data = {totalamount : new_amount}
//          TotalAmount.updateOne(query,data,(err,collection) => {
//              if(err) throw err;
//              console.log("Record updated successfully");
//              console.log(collection);
//          })
//          TotalAmount.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//            if(docs.length<1) {
                  
//   const total1=new TotalAmount({
//        customername:customer_name,
//         totalamount:amount,
//         invoice:invoice,
//         date:billdate 
//    })
//    total1.save()
    

//            }

//            })
//            }

          
//    })

//    DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
//     // console.log(docs)
//     if(billdate.length>1){
//         for(i=0;i<docs.length;i++){
//         //     var existing_item=docs[i].itemquantity;
//         //     console.log(existing_item)
//         // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//         // console.log(new_items)
//        var oldamount=docs[i].totalamount;
//         var new_amount=parseFloat(oldamount) +parseFloat(amount);
            
//             }
            
//     var query = {date : billdate };//check where there is an item and update
//     var data = {totalamount : new_amount}
//   DailySales.updateOne(query,data,(err,collection) => {
//       if(err) throw err;
//       console.log("Record updated successfully");
//       console.log(collection);
//   })
//   DailySales.find({'date' : new RegExp(billdate, 'i')}, function(err, docs){
//     if(docs.length<1) {
           
//       const daily=new DailySales({
//        totalamount:amount,
//         date:billdate  
//       })
//        daily.save(); //save the dailysale
//   } })
//   }  })
  
   

// req.flash('server-success',"You have sucessfully made purchases");
//        res.redirect("/retail")

//     }else{
//         console.log("you have to top up");
//         req.flash('server-error',"you have to top up  stocks to make sales");
//         res.redirect("/retail")
//     }
   
//   })
  
//  }
//    // res.render('pages/AddItems');
// })
























// router.post('/purchases',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Purchase.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/purchasesearch',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })



// router.post('/purchases',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Purchase.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/purchasesearch',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })





// router.post('/userviewpurchases',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Purchase.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/userviewpurchases',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })







// router.get('/purchases', function (req, res) {
   
//     Purchase.find({},function(err,purchase,purchase1){
        
//                     for(i=0;i<purchase.length;i++){
//                       var  name= purchase[i].customername;
//                       if(name.length>1){
//                         console.log(name) 
//                      }else{
//                          console.log("exit");
//                      }
//                     }
                    
//        function ama(){
//            alert("hello world");
//        }
//         // console.log(purchase)


//         username=req.session.username;
//         Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      
//         for(i=0;i<docs.length;i++){
//           var id=docs[i].id;
//           var firstname=docs[i].firstname;
//           var lastname=docs[i].lastname;
//           var image=docs[i].image;
//         }
//         res.render('pages/purchases',{purchase:purchase,ama:ama,firstname:firstname,lastname:lastname,image:image,id:id});
//     })
   
// })
    

// })




// router.post('/searchdebtors',function(req, res) {
//   var search=req.body.search;
// Creditsales.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){ 
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/searchdebtorspage',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })




































// router.post('/alldebtors',function(req, res) {

//   var search=req.body.search;
  

// Creditsales.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/alldebtorsadmin',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })





// router.get('/alldebtors', function (req, res) {
   
//     Creditsales.find({},function(err,purchase,purchase1){
        
//                     for(i=0;i<purchase.length;i++){
//                       var  name= purchase[i].customername;
//                       if(name.length>1){
//                         console.log(name) 
//                      }else{
//                          console.log("exit");
//                      }
//                     }
                    
//        function ama(){
//            alert("hello world");
//        }

//        username=req.session.username;
//        Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
     
//        for(i=0;i<docs.length;i++){
//          var id=docs[i].id;
//          var firstname=docs[i].firstname;
//          var lastname=docs[i].lastname;
//          var image=docs[i].image;
//        }
//         // console.log(purchase)
//         res.render('pages/alldebtors',{purchase:purchase,ama:ama,firstname:firstname,lastname:lastname,image:image,id:id});
//     })
// })

// })
















// router.get('/userviewpurchases', function (req, res) {
//     Purchase.find({},function(err,purchase,purchase1){

//                     for(i=0;i<purchase.length;i++){
//                       var  name= purchase[i].customername;
//                       if(name.length>1){
//                         console.log(name) 
//                      }else{
//                          console.log("exit");

//                      }
//                     }
                    
//        function ama(){
//            alert("hello world");
//        }

//        username=req.session.username;
//        Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
     
//        for(i=0;i<docs.length;i++){
//          var id=docs[i].id;
//          var firstname=docs[i].firstname;
//          var lastname=docs[i].lastname;
//          var image=docs[i].image;
//        }
//         // console.log(purchase)
//         res.render('pages/userviewpurchases',{purchase:purchase,ama:ama,firstname:firstname,lastname:lastname,image:image,id:id});
//     })
   
   
// })

// })



// router.get('/checkpage', function (req, res) {
//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//     res.render('pages/checkpage',{lastname:lastname,firstname:firstname,image:image});
// })
// })

// router.get('/creditsales', function (req, res) {
//     model();
//     const invoice=Math.random().toString().substring(4,12);
//     Add.find({},function(err,sales){
//        //get the current date
//        todayDate()//for the date
//     var getDate=todayDate();
//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//   res.render('pages/creditsales',{sales:sales,getDate:getDate,invoice:invoice,firstname:firstname,lastname:lastname,image:image,id:id,
//     serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//          })
// })
// })


// router.get('/creditretailsales', function (req, res) {
//   model();
//   const invoice=Math.random().toString().substring(4,12);
//   Add.find({},function(err,sales){
//      //get the current date
//      todayDate()//for the date
//   var getDate=todayDate();
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
// res.render('pages/creditretailsales',{sales:sales,getDate:getDate,invoice:invoice,firstname:firstname,lastname:lastname,image:image,id:id,
//   serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//        })
// })
// })





// router.post('/creditsales', function (req, res) {
//    var invoice=req.body.invoice;
//    var billdate=req.body.date;
//    var customer_name=req.body.customer_name;
//    var quantity=req.body.quantity;
//    var quantity1=req.body.quantity1;
//    var amount=req.body.amount;
//    var price=req.body.price;
//    var item=req.body.itemlist;
//    if(invoice===""){
//     req.flash('server-error',"please enter the invoice")
//     res.redirect("/creditsales")
//   }
//  else if(billdate===""){
//    req.flash('server-error',"please update the time")
//    res.redirect("/creditsales")
//  }
//  else if(item===""){
//   req.flash('server-error',"please enter your item bought")
//   res.redirect("/creditsales")
// }
//  else if(customer_name===""){
//    req.flash('server-error',"please enter your name")
//    res.redirect("/creditsales")
//  }else if(quantity===""){
//    req.flash('server-error',"please enter the quantity")
//    res.redirect("/creditsales")
//  }else if(amount===""){
//    req.flash('server-error',"please enter your amount")
//    res.redirect("/creditsales")
//  }else if(price===""){
//    req.flash('server-error',"please enter the price")
//    res.redirect("/creditsales")
//  }
// else{
//     model();//call the database model
//     total();//this is the total schema
//    Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){

//      for(i=0;i<docs.length;i++){
//         var checkquantity=docs[i].itemquantity;
//      }
//      if(quantity<=checkquantity){
//          console.log("you have more goods")

//       //now subtract the quantity entered from the existing quantity
//           var remaining_quantity=checkquantity-(parseFloat(quantity));
//           console.log(remaining_quantity);
//           var query = { itemname : item };
//           var data = {itemquantity : remaining_quantity }
//         Add.updateOne(query,data,(err,collection) => {
//             if(err) throw err;
//             console.log("Record updated successfully");
//             console.log(collection);
//         })

//         //call the purchases function
//         model2();
//         const creditsales=new Creditsales(
//             {
//                 invoice:invoice,
//                 date:billdate,
//                  customername:customer_name,
//                  itemname:item,
//                  quantity:quantity,
//                  quantity1:0,
//                  price:price,
//                  totalamount:amount   
//             }
//         )
//         creditsales.save();

// //insert the total amount of cost of goods bought from a seller
//     CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//             // console.log(docs)
//             if(customer_name.length>1){
//                 for(i=0;i<docs.length;i++){
//                 //     var existing_item=docs[i].itemquantity;
//                 //     console.log(existing_item)
//                 // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//                 // console.log(new_items)
//                var oldamount= (docs[i].totalamount);
//                 var new_amount=parseFloat(oldamount)+parseFloat(amount);
                    
//                     }
                    
//             var query = { customername : customer_name };//check where there is an item and update
//             var data = {totalamount : new_amount}
//             CreditAmounttotal.updateOne(query,data,(err,collection) => {
//               if(err) throw err;
//               console.log("Record updated successfully");
//               console.log(collection);
//           })
//           CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//             if(docs.length<1) {
                   
//    const total1=new CreditAmounttotal({
//         customername:customer_name,
//          totalamount:amount,
//          invoice:invoice   
//     })
//     total1.save()
     

//             }

//             })
//             }

           
//     })

// //    const total1=new TotalAmount({
// //         customername:customer_name,
// //          totalamount:amount,
// //          invoice:invoice   
// //     })
// //     total1.save()
     
    

// req.flash('server-success',"You have successfully credited stocks");
//         res.redirect("/creditsales")

//      }else{
//          console.log("you have to top up");
//          req.flash('server-error',"Top up stocks before you can proceed to credit");
//          res.redirect("/creditsales")
//      }
    
//    })
   
//   }
//     // res.render('pages/AddItems');
// })





// router.post('/creditsales', function (req, res) {
//    var invoice=req.body.invoice;
//    var billdate=req.body.date;
//    var customer_name=req.body.customer_name;
//    var quantity=req.body.quantity;
//    var amount=parseFloat(req.body.amount);
//    var price=parseFloat(req.body.price);
//    var item=req.body.itemlist;
//    if(invoice===""){
//     req.flash('server-error',"please enter the invoice")
//     res.redirect("/creditsales")
//   }
//  else if(billdate===""){
//    req.flash('server-error',"please update the time")
//    res.redirect("/creditsales")
//  }
//  else if(item===""){
//   req.flash('server-error',"please enter your item bought")
//   res.redirect("/creditsales")
// }
//  else if(customer_name===""){
//    req.flash('server-error',"please enter your name")
//    res.redirect("/creditsales")
//  }else if(quantity===""){
//    req.flash('server-error',"please enter the quantity")
//    res.redirect("/creditsales")
//  }else if(amount===""){
//    req.flash('server-error',"please enter your amount")
//    res.redirect("/creditsales")
//  }else if(price===""){
//    req.flash('server-error',"please enter the price")
//    res.redirect("/creditsales")
//  }
// else{
//     model();//call the database model
//     total();//this is the total schema
//    Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){

//      for(i=0;i<docs.length;i++){
//         var checkquantity=docs[i].itemquantity;
//      }
//      if(quantity<=checkquantity){
//          console.log("you have more goods")

//       //now subtract the quantity entered from the existing quantity
//           var remaining_quantity=checkquantity-(parseFloat(quantity));
//           console.log(remaining_quantity);
//           var query = { itemname : item };
//           var data = {itemquantity : remaining_quantity }
//         Add.updateOne(query,data,(err,collection) => {
//             if(err) throw err;
//             console.log("Record updated successfully");
//             console.log(collection);
//         })

//         //call the purchases function
//         model2();
//         const creditsales=new Creditsales(
//             {
//                 invoice:invoice,
//                 date:billdate,
//                  customername:customer_name,
//                  itemname:item,
//                  quantity:quantity,
//                  price:price,
//                  totalamount:amount   
//             }
//         )
//         creditsales.save();

// //insert the total amount of cost of goods bought from a seller
//     CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//             // console.log(docs)
//             if(customer_name.length>1){
//                 for(i=0;i<docs.length;i++){
//                 //     var existing_item=docs[i].itemquantity;
//                 //     console.log(existing_item)
//                 // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//                 // console.log(new_items)
//                var oldamount= (docs[i].totalamount);
//                 var new_amount=parseFloat(oldamount)+parseFloat(amount);
                    
//                     }
                    
//             var query = { customername : customer_name };//check where there is an item and update
//             var data = {totalamount : new_amount}
//             CreditAmounttotal.updateOne(query,data,(err,collection) => {
//               if(err) throw err;
//               console.log("Record updated successfully");
//               console.log(collection);
//           })
//           CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//             if(docs.length<1) {
                   
//    const total1=new CreditAmounttotal({
//         customername:customer_name,
//          totalamount:amount,
//          invoice:invoice   
//     })
//     total1.save()
     

//             }

//             })
//             }

           
//     })

// //    const total1=new TotalAmount({
// //         customername:customer_name,
// //          totalamount:amount,
// //          invoice:invoice   
// //     })
// //     total1.save()
     
    

// req.flash('server-success',"You have successfully credited stocks");
//         res.redirect("/creditsales")

//      }else{
//          console.log("you have to top up");
//          req.flash('server-error',"Top up stocks before you can proceed to credit");
//          res.redirect("/creditsales")
//      }
    
//    })
   
//   }
//     // res.render('pages/AddItems');
// })




// router.get('/additems', function (req, res) {
//   username=req.session.username;
//   Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//     res.render('pages/AddItems',{id:id,firstname:firstname,lastname:lastname,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
// })
// })
// router.get('/allstocks', function (req, res) {
//     model();

//     username=req.session.username;
//     Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//     Add.find({},function(err,additems){
//     if(additems.length<1){
//         res.render('pages/checkpage',{firstname:firstname,lastname:lastname,image:image,id:id});
//         }else{
//             for(i=0;i<additems.length;i++){
//                 var id=additems[i].id;
//                 var reduce=id.slice(0,8);//slice the id to the last 8 digits
//             }
//                 res.render('pages/allstocks',{additems:additems,reduce:reduce,firstname:firstname,lastname:lastname,image:image,id:id});
         
//         }
//     })
  
// })})
//  router.post('/additems',(req,res)=>{
//      todayDate();
//     var getDate=todayDate();
//      var itemname=req.body.itemname.toUpperCase();
//     var itemprice=parseFloat(req.body.itemprice);
//    var  itemquantity=req.body.itemquantity;
//    var pieceperquantity= parseFloat(req.body.pieceperquantity);
//    var total=parseFloat(req.body.total);
//     if(itemname===""){
//     req.flash('server-error'," Please enter the item name");
//     res.redirect("/additems")
//   }else if(itemprice===""){
//     req.flash('server-error'," Please enter the price of the item");
//     res.redirect("/additems")
//   } else if(itemquantity===""){
//     req.flash('server-error'," Please enter the quantity of the item");
//     res.redirect("/additems")
//   }
//   else if(pieceperquantity===""){
//     req.flash('server-error'," Please enter the pieces per item");
//     res.redirect("/additems")
//   }
//   else if(total===""){
//     req.flash('server-error'," Please enter the total amount");
//     res.redirect("/additems")
//   }
// else{

// model();// this function calls the add model function
// console.log(getDate)

// Add.find({'itemname' : new RegExp(itemname, 'i')}, function(err, docs){
//    if(itemname.length>1){
//        for(i=0;i<docs.length;i++){
//        var existing_item=docs[i].itemquantity;
//        console.log(existing_item)
//    var new_items=parseFloat(existing_item)+parseFloat(itemquantity);
//    console.log(new_items)
        

//        }

//        var query = { itemname : itemname };//check where there is an item and update
//        var data = {itemquantity : new_items }
//      Add.updateOne(query,data,(err,collection) => {
//          if(err) throw err;
//          console.log("Record updated successfully");
//          console.log(collection);
//      })
//      Add.find({'itemname' : new RegExp(itemname, 'i')}, function(err, docs){
//             if(docs.length<1) {
//                 const admindata=new Add(
//                         {
//                            itemname:itemname,
//                            itemprice:itemprice,
//                            itemquantity:itemquantity,
//                            pieceperquantity:pieceperquantity,
//                            total:total,
//                            date:getDate,
                           
//                         });
                    
//                     admindata.save();
//             }      
                  
//      })

//    }
    

// })
// // .then(function(todayDate) {
   
// // const admindata=new Add(
// //     {
// //        itemname:itemname,
// //        itemprice:itemprice,
// //        itemquantity:itemquantity,
// //        date:getDate,
// //     });

// // admindata.save();
// //   })

// //insert to the admin table in the database






// // const admindata=new Add(
// //     {
// //        itemname:itemname,
// //        itemprice:itemprice,
// //        itemquantity:itemquantity,
// //        date:getDate,
// //     });

// // admindata.save();
// req.flash('server-success',"Items added successfully");
// res.redirect("/additems");
// }
// });




// router.post('/creditretailsales', function (req, res) {
//   var invoice=req.body.invoice;
//   var billdate=req.body.date;
//   var customer_name=req.body.customer_name;
//   var quantity1=req.body.quantity1;
//   var quantity=req.body.quantity;
//   var amount=parseFloat(req.body.amount);
//   var price=parseFloat(req.body.price);
//   var item=req.body.itemlist;
//   if(invoice===""){
//    req.flash('server-error',"please enter the invoice")
//    res.redirect("/creditretailsales")
//  }
// else if(billdate===""){
//   req.flash('server-error',"please update the time")
//   res.redirect("/creditretailsales")
// }
// else if(item===""){
//  req.flash('server-error',"please enter your item bought")
//  res.redirect("/creditretailsales")
// }
// else if(customer_name===""){
//   req.flash('server-error',"please enter your name")
//   res.redirect("/creditretailsales")
// }else if(quantity1===""){
//   req.flash('server-error',"please enter the items")
//   res.redirect("/creditretailsales")
// }else if(amount===""){
//   req.flash('server-error',"please enter your amount")
//   res.redirect("/creditretailsales")
// }else if(price===""){
//   req.flash('server-error',"please enter the price")
//   res.redirect("/creditretailsales")
// }
// else{
//    model();//call the database model
//    total();//this is the total schema
//   Add.find({'itemname' : new RegExp(item, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
//         var checktotal=docs[i].total;
//     }
//     if(quantity1<=checktotal){
//         console.log("you have more goods")

//      //now subtract the quantity entered from the existing quantity
//           var remaining_quantity=checktotal-(parseFloat(quantity1));
//          console.log(remaining_quantity);
//          var query = { itemname : item };
//          var data = {total : remaining_quantity }
//        Add.updateOne(query,data,(err,collection) => {
//            if(err) throw err;
//            console.log("Record updated successfully");
//            console.log(collection);
//        })

//        //call the purchases function
//        model2();
//        const creditsales=new Creditsales(
//            {
//                invoice:invoice,
//                date:billdate,
//                 customername:customer_name,
//                 itemname:item,
//                 quantity:0,
//                 quantity1:quantity1,
//                 price:price,
//                 totalamount:amount   
//            }
//        )
//        creditsales.save();

// //insert the total amount of cost of goods bought from a seller
//    CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//            // console.log(docs)
//            if(customer_name.length>1){
//                for(i=0;i<docs.length;i++){
//                //     var existing_item=docs[i].itemquantity;
//                //     console.log(existing_item)
//                // var new_items=parseInt(existing_item)+parseInt(itemquantity);
//                // console.log(new_items)
//               var oldamount= (docs[i].totalamount);
//                var new_amount=parseFloat(oldamount)+parseFloat(amount);
                   
//                    }
                   
//            var query = { customername : customer_name };//check where there is an item and update
//            var data = {totalamount : new_amount}
//            CreditAmounttotal.updateOne(query,data,(err,collection) => {
//              if(err) throw err;
//              console.log("Record updated successfully");
//              console.log(collection);
//          })
//          CreditAmounttotal.find({'customername' : new RegExp(customer_name, 'i')}, function(err, docs){
//            if(docs.length<1) {
                  
//   const total1=new CreditAmounttotal({
//        customername:customer_name,
//         totalamount:amount,
//         invoice:invoice   
//    })
//    total1.save()
    

//            }

//            })
//            }

          
//    })

// //    const total1=new TotalAmount({
// //         customername:customer_name,
// //          totalamount:amount,
// //          invoice:invoice   
// //     })
// //     total1.save()
    
   

// req.flash('server-success',"You have successfully credited stocks");
//        res.redirect("/creditretailsales")

//     }else{
//         console.log("you have to top up");
//         req.flash('server-error',"Top up stocks before you can proceed to credit");
//         res.redirect("/creditretailsales")
//     }
   
//   })
  
//  }
//    // res.render('pages/AddItems');
// })















// router.get('/admininformation:id', function (req, res) {
//   var username=req.session.username;
//     var id=req.params.id;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//       for(i=0;i<docs.length;i++){
      
//         var firstname=docs[i].firstname;
//         var lastname=docs[i].lastname;
//         var image=docs[i].image;
//     }
//     Purchase.findById(id,function(err,information){
//         var price=information.price;
//         var invoice=information.invoice;
//         var name=information.customername;
//         var date=information.date;
//         var quantity=information.quantity;
//         var quantity1=information.quantity1;
//         var amount=information.totalamount;
//         var item=information.itemname;
//         res.render('pages/admininformation',{information:information,price:price,name:name,invoice:invoice,date:date,item:item,amount:amount,quantity:quantity,quantity1:quantity1,id:id,lastname:lastname,firstname:firstname,image:image});
//     })
      
// })
// })












// router.get('/information:id', function (req, res) {
//   var username=req.session.username;
//     var id=req.params.id;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//       for(i=0;i<docs.length;i++){
      
//         var firstname=docs[i].firstname;
//         var lastname=docs[i].lastname;
//         var image=docs[i].image;
//     }
//     Purchase.findById(id,function(err,information){
//         var price=information.price;
//         var invoice=information.invoice;
//         var name=information.customername;
//         var date=information.date;
//         var quantity=information.quantity;
//         var quantity1=information.quantity1;
//         var amount=information.totalamount;
//         var item=information.itemname;
//         res.render('pages/information',{information:information,price:price,name:name,invoice:invoice,date:date,item:item,amount:amount,quantity1:quantity1,quantity:quantity,id:id,lastname:lastname,firstname:firstname,image:image});
//     })
       
// })
// })
// router.get('/supplierinformation:id', function (req, res) {
//      var id=req.params.id;
//     Supplier.findById(id,function(err,information){
//         var suppliername=information.suppliername;
//         var Phonenumber=information.Phonenumber;
//         var Items=information.Items;
//         username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
    
        
//         res.render('pages/supplierinformation',{suppliername:suppliername,Phonenumber:Phonenumber,Items:Items,id:id,firstname:firstname,lastname:lastname,image:image});
    
//   })
//       })
  
// })




// router.get('/supplieradmininformation:id', function (req, res) {
//   var id=req.params.id;
//  Supplier.findById(id,function(err,information){
//      var suppliername=information.suppliername;
//      var Phonenumber=information.Phonenumber;
//      var Items=information.Items;
//      username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
 
//  }
     
//      res.render('pages/supplieradmininformation',{suppliername:suppliername,Phonenumber:Phonenumber,Items:Items,id:id,firstname:firstname,lastname:lastname,image:image});
 
// })
//    })

// })












// router.get('/debtorsinformation:id', function (req, res) {
// var username=req.session.username;

//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
      
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//   }
//     var id=req.params.id;
//     Creditsales.findById(id,function(err,information){
//         var price=information.price;
//         var invoice=information.invoice;
//         var name=information.customername;
//         var date=information.date;
//         var quantity=information.quantity;
//         var quantity1=information.quantity1;
//         var amount=information.totalamount;
//         var item=information.itemname;
//         res.render('pages/debtorsinformation',{information:information,price:price,name:name,invoice:invoice,date:date,item:item,amount:amount,
//           quantity:quantity,quantity1:quantity1,
//         firstname:firstname,lastname:lastname,image:image,id:id});
//     })
  
// })
// })

// router.get('/userhome',function(req,res){
//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//     res.render("pages/userhome",{username:username,id:id,firstname:firstname,lastname:lastname,image:image});
//     })

// })

// router.get('/debtorsedit:id',function(req,res){
// var username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
      
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//   }
//     var id=req.params.id;
//      model();
//      Add.find({},function(err,sales){
//    res.render('pages/debtorsedit',{sales:sales,id:id,firstname:firstname,lastname:lastname,image:image,
//     serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//            })
          
//  })
// })

//  router.post('/debtorsedit:id',function(req,res){
//   var id=req.params.id;//get the id 
//   var invoice=req.body.invoice;
//   var billdate=req.body.date;
//   var customer_name=req.body.customer_name;
//   var quantity=parseFloat(req.body.quantity);
//   var quantity1=parseFloat(req.body.quantity1);
//   var amount=parseFloat(req.body.amount);
//   var price=parseFloat(req.body.price);
//   var item=req.body.itemlist;
//   if(invoice===""){
//     req.flash('server-error',"please enter the invoice")
//     res.redirect("/debtorsedit"+id)
//   }
//  else if(billdate===""){
//    req.flash('server-error',"please update the time")
//    res.redirect("/debtorsedit"+id)
//  }
//  else if(item===""){
//   req.flash('server-error',"please enter your item bought")
//   res.redirect("/debtorsedit"+id)
// }
//  else if(customer_name===""){
//    req.flash('server-error',"please enter your name")
//    res.redirect("/debtorsedit"+id)
//  }else if(quantity===""){
//    req.flash('server-error',"please enter the number of boxes")
//    res.redirect("/debtorsedit"+id)
//  }else if(quantity1===""){
//   req.flash('server-error',"please enter the number of boxes")
//   res.redirect("/debtorsedit"+id)
// }
//  else if(amount===""){
//    req.flash('server-error',"please enter your amount")
//    res.redirect("/debtorsedit"+id)
//  }else if(price===""){
//    req.flash('server-error',"please enter the price")
//    res.redirect("/debtorsedit"+id)
//  }
// else{
//    Creditsales.findByIdAndUpdate(id, { invoice:invoice,date:billdate,customername:customer_name,itemname:item,quantity:quantity,quantity1:quantity1,totalamount:amount,price:price}, 
//                                    function (err, docs) {                          
//            if (err){ 
//                console.log(err) 
//            } 
//            else{ 
             
//            } 
//            req.flash('server-success',"You have updated your information successfully")
//            console.log("information inserted successfully");
//            res.redirect("/debtorsedit"+id);
//        }); 
       
//       }
//    })
   
// router.get('/suppliersedit:id',function(req,res){

//      var username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//       for(i=0;i<docs.length;i++){
//         var id=docs[i].id;
//         var firstname=docs[i].firstname;
//         var lastname=docs[i].lastname;
//         var image=docs[i].image;
// }
//     var id=req.params.id;
//      Add.find({},function(err,sales){
//    res.render('pages/suppliersedit',{sales:sales,id:id,firstname:firstname,lastname:lastname
//   ,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//            })
 
          
//         })
      
//         })


      //   router.get('/suppliersadminedit:id',function(req,res){
      //     var username=req.session.username;
      //    Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
     
      //      for(i=0;i<docs.length;i++){
      //        var id=docs[i].id;
      //        var firstname=docs[i].firstname;
      //        var lastname=docs[i].lastname;
      //        var image=docs[i].image;
      //    }
      //    var id=req.params.id;
     
      //     Add.find({},function(err,sales){
      //   res.render('pages/suppliersadminedit',{sales:sales,id:id,firstname:firstname,lastname:lastname
      //  ,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
      //           })
      
               
      //        })
      //        })











//  router.post('/suppliersedit:id',function(req,res){
//   var id=req.params.id;//get the id 
//   var suppliername=req.body.suppliername;
//   var Phonenumber=req.body.phonenumber;
//   var item=req.body.item;
//   if(suppliername===""){
//     req.flash('server-error'," Please enter the Supplier's name");
//     res.redirect("/suppliersedit"+id)
//   }else if(Phonenumber===""){
//     req.flash('server-error'," Please enter the Supplier's phonenumber");
//     res.redirect("/suppliersedit"+id)
//   }else if(item===""){
//     req.flash('server-error'," Please enter the item name to supply");
//     res.redirect("/suppliersedit"+id)
//   }
//   else{
//     Supplier.findByIdAndUpdate(id, { suppliername:suppliername,Phonenumber:Phonenumber,Items:item}, 
//                                    function (err, docs) { 
                                 
//            if (err){ 
//                console.log(err) 
//            } 
//            else{ 
             
//            } 
//            // req.flash('server-success',"You have updated your information successfully")
//            console.log("information inserted successfully");
//            req.flash('server-success',"Supplier's information updated successfully");
//            res.redirect("/suppliersedit"+id);
//        }); 
//   } 
   
//    })
   



//    router.post('/suppliersadminedit:id',function(req,res){

//     var id=req.params.id;//get the id 
//     var suppliername=req.body.suppliername;
//     var Phonenumber=req.body.phonenumber;
//     var item=req.body.item;

// if(suppliername===""){
//   req.flash('server-error',"please enter supplier's name")
//   res.redirect("/suppliersadminedit"+id);
// }
// else if(Phonenumber===""){
//   req.flash('server-error',"please enter supplier's phonenumber");
//   res.redirect("/suppliersadminedit"+id);
// }else if(item===""){
// req.flash('server-error',"please enter items supplied");
// res.redirect("/suppliersadminedit"+id);
// }else{

//     Supplier.findByIdAndUpdate(id, { suppliername:suppliername,Phonenumber:Phonenumber,Items:item}, 
//                                    function (err, docs) { 
                                 
//            if (err){ 
//                console.log(err) 
//            } 
//            else{ 
             
//            } 
//            // req.flash('server-success',"You have updated your information successfully")
//            console.log("information inserted successfully");
//            req.flash('server-success',"information successfully updated")
//            res.redirect("/suppliersadminedit"+id);
//        }); 
       
//       }
//    })
   







// router.get('/edit:id',function(req,res){
//   var username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
        
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//   }
//       var id=req.params.id;
//     model();
//     Purchase.findById(req.params.id, function(err,consultation) {
//    var name1=consultation.customername; 
    
//     Add.find({},function(err,sales){
//   res.render('pages/edit',{sales:sales,name1:name1,id:id,firstname:firstname,lastname:lastname,image:image
//   ,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//           })
//         })

//   })
//   })

// router.get('/adminitemsedit:id',function(req,res){
//  var id=req.params.id;
// var username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//     for(i=0;i<docs.length;i++){
        
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//   }
   
//      model();
//      Add.findById(id,function(err,information){
//         var item=information.itemname;
//         var itemprice=information.itemprice;
//         var itemquantity=information.itemquantity;
//         var date=information.date;
//         var total=information.total; 
//      Add.find({},function(err,sales){
//    res.render('pages/adminitemsedit',{sales:sales,id:id,item:item,itemprice:itemprice,itemquantity:itemquantity,date:date,firstname:firstname,lastname:lastname,image:image,total:total,
//     serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//            })
//         })
//  })
//   })
//  router.post('/adminitemsedit:id',function(req,res){
//  var id=req.params.id;//get the id 
//  var billdate=req.body.date;
//  var quantity=req.body.quantity;
//  var price=req.body.itemprice;
//  var item=req.body.itemlist;
//  var total=req.body.total;

//  if(billdate===""){
//    req.flash('server-error',"please enter the billdate")
//    res.redirect("/adminitemsedit"+id);
//  }
//  else if(quantity===""){
//   req.flash('server-error',"please enter the quantity")
//   res.redirect("/adminitemsedit"+id);
//  }
//  else if(price===""){
//   req.flash('server-error',"please enter the price ")
//   res.redirect("/adminitemsedit"+id);
//  }
//  else if(item===""){
//   req.flash('server-error',"please enter the item")
//   res.redirect("/adminitemsedit"+id);
//  }
//  else if(total===""){
//   req.flash('server-error',"please enter the total")
//   res.redirect("/adminitemsedit"+id);
//  }
//  else{
//    var parseprice=parseFloat(price)
//    var parsequantity=parseFloat(quantity)
//    var parsetotal=parseFloat(total)
//  Add.findByIdAndUpdate(id, { itemname:item,date:billdate,itemprice:parseprice,itemquantity:parsequantity,total:parsetotal}, 
//      function (err, docs) { 
// //  req.flash('server-success',"You have updated your information successfully")
 
//  req.flash('server-success',"information inserted successfully")
// res.redirect("/adminitemsedit"+id);
//  }); 

//  }
//  })

// router.post('/edit:id',function(req,res){

//  var id=req.params.id;//get the id 
//  var invoice=req.body.invoice;
//  var billdate=req.body.date;
//  var customer_name=req.body.customer_name;
//  var quantity=parseFloat(req.body.quantity);
//  var quantity1=parseFloat(req.body.quantity1);
//  var amount=parseFloat(req.body.amount);
//  var price=parseFloat(req.body.price);
//  var item=req.body.itemlist;
//  if(invoice===""){
//    req.flash('server-error',"please enter the invoice")
//    res.redirect("/edit"+id)
//  }
// else if(billdate===""){
//   req.flash('server-error',"please update the time")
//   res.redirect("/edit"+id)
// }else if(customer_name===""){
//   req.flash('server-error',"please enter your name")
//   res.redirect("/edit"+id)
// }else if(quantity===""){
//   req.flash('server-error',"please enter the quantity")
//   res.redirect("/edit"+id)
// }
// else if(quantity1===""){
//   req.flash('server-error',"please enter the quantity")
//   res.redirect("/edit"+id)
// }
// else if(amount===""){
//   req.flash('server-error',"please enter your amount")
//   res.redirect("/edit"+id)
// }else if(price===""){
//   req.flash('server-error',"please enter the price")
//   res.redirect("/edit"+id)
// }else if(item===""){
//   req.flash('server-error',"please enter your item bought")
//   res.redirect("/edit"+id)

  
// }else{
// Purchase.findByIdAndUpdate(id, { invoice:invoice,date:billdate,customername:customer_name,itemname:item,quantity:quantity,quantity1:quantity1,totalamount:amount,price:price}, 
//                                 function (err, docs) { 
                              
//                                   var setNewAmount=amount;
//                                   var query = { customername : customer_name };
//                                   var data = {totalamount :  setNewAmount}
//                                 TotalAmount.updateOne(query,data,(err,collection) => {
//                                     if(err) throw err;
//                                     console.log("Record updated successfully");
//                                     console.log(collection);
//                                 })
//         // req.flash('server-success',"You have updated your information successfully")
//         console.log("information inserted successfully");
//         req.flash('server-success',"information has been succesfully updated")
//         res.redirect("/edit"+id);
       
//     }); 
//   } 

// })



//for the userlogin



// router.post("/userlogin",function(req,res,next){
      
//     req.session.username=req.body.username;
//     var username=req.session.username;
//    req.session.password=req.body.password;
//    var password=md5(req.session.password);
//    var username1=req.body.username;
//     Register.findOne({username:username},function(err,founduser,foundname){
//      if(!founduser){
//   console.log("incorrect credentials")
//   var warning="incorrect credentials";
//   req.flash('server-error',"Incorrect credentials try again")
//       return res.render("pages/signupandsignin",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
     
    
//     }
//     if(founduser.password !=password){
//       console.log("incorrect credentials")
//       req.flash('server-error',"Incorrect credentials try again")
//       res.render("pages/signupandsignin",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
//     }
  
//      if(founduser.password===password || founduser.role==="Admin"){
//       // console.log(founduser.age)
//      var firstname=founduser.firstname;
//      var lastname=founduser.lastname;
//      var id=founduser.id;
//       // return res.render("user",{firstname:firstname,lastname:lastname,id:id})
//       res.redirect(url.format({
//         pathname:"/userhome",
//         query: {
//            firstname: firstname,
//            lastname:lastname
//             }
//       }));

//     }
    

// })

// })











// router.get('/adminitemsdelete:id',function(req,res){
//     var id=req.params.id;
//     Add.findByIdAndDelete(id, function (err) {
//         if(err) console.log(err);
//         console.log("Successful deletion");
//         res.redirect("/allstocks")
// })
// })

// router.get('/supplier',function(req,res){


//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//     res.render('pages/addsuppliers',{firstname:firstname,lastname:lastname,image:image,id:id,
//       serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
// })
// })


// router.post('/adminsupplier',function(req,res){
//   username=req.session.username;
//   Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//    } 
// var suppliername=req.body.suppliername;
// var phone=req.body.phonenumber;
// var item=req.body.item;

// if(suppliername===""){
//   req.flash('server-error'," Please enter the Supplier's name");
//   res.redirect("/adminsupplier")
// }else if(phone===""){
//   req.flash('server-error'," Please enter the Supplier's phonenumber");
//   res.redirect("/adminsupplier")
// }else if(item===""){
//   req.flash('server-error'," Please enter the item name to supply");
//   res.redirect("/adminsupplier")
// }
// else{
// const supply=new Supplier({
//         suppliername:suppliername,
//         Phonenumber:phone,
//         Items:item})
//   const check=supply.save();
// if(check){
//     console.log("successful");
//      req.flash('server-success',"Data inserted  successfully");
//     res.redirect("/adminsupplier")
      
// }else{
//     console.log("error while adding supplier")
//      req.flash('server-error'," error while adding supplier");
//   res.redirect("/adminsupplier")
// }
//   }

// })
     
// })

// router.get('/adminsupplier',function(req,res){


//   username=req.session.username;
//   Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//   res.render('pages/addsuppliersadmin',{firstname:firstname,lastname:lastname,image:image,id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
// })
// })









// router.get('/admin',function(req,res){
//     res.render('pages/adminlogin',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
// })
// router.get('/adminhome',function(req,res){

//     username=req.session.username;
//     Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }

//     res.render('pages/adminhome',{firstname:firstname,lastname:lastname,image:image,id:id})
// })

// })

// router.post('/supplier',function(req,res){
//   var suppliername=req.body.suppliername;
// var phone=req.body.phonenumber;
// var item=req.body.item;
//   if(suppliername===""){
//     req.flash('server-error'," Please enter the Supplier's name");
//     res.redirect("/supplier")
//   }else if(phone===""){
//     req.flash('server-error'," Please enter the Supplier's phonenumber");
//     res.redirect("/supplier")
//   }else if(item===""){
//     req.flash('server-error'," Please enter the item name to supply");
//     res.redirect("/supplier")
//   }
//   else{
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image; 
//     }   
// const supply=new Supplier({
//         suppliername:suppliername,
//         Phonenumber:phone,
//         Items:item})
//   const check=supply.save();
// if(check){
//     console.log("successful");
//     req.flash('server-success',"Supplier's information added successfully");
//     res.redirect("supplier")
  
//   }else{
//     console.log("error while adding supplier")
// }
  
// })
//   }   
// })
// router.get('/allsuppliers',function(req,res){
//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
    
//     Supplier.find({},function(err,sales){
//              console.log(sales)
//         res.render('pages/allsuppliers',{sales:sales,firstname:firstname,lastname:lastname,image:image,id:id});
//                 })
// })
// })

// router.get('/allsuppliersadmin',function(req,res){
//   username=req.session.username;
//   Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
  
//   Supplier.find({},function(err,sales){
//            console.log(sales)
//       res.render('pages/allsuppliersadmin',{sales:sales,firstname:firstname,lastname:lastname,image:image,id:id});
//               })
// })
// })












// router.get('/debtorsdelete:id',function(req,res){
//     console.log(req.params.id);


//     Creditsales.findByIdAndDelete(req.params.id, function (err) {
//         if(err) console.log(err);
//         console.log("Successful deletion");
//         res.redirect("/alldebtors")
// })
// })

// router.get('/suppliersdelete:id',function(req,res){
//     console.log(req.params.id);


//     Supplier.findByIdAndDelete(req.params.id, function (err) {
//         if(err) console.log(err);
//         console.log("Successful deletion");
//         res.redirect("/allsuppliers")
// })
// })

// router.get('/usersdelete:id',function(req,res){
//   console.log(req.params.id);
//   Register.findByIdAndDelete(req.params.id, function (err) {
//       if(err) console.log(err);
//       console.log("Successful deletion");
//       res.redirect("/allusers")
// })
// })





// router.get('/delete:id',function(req,res){
//     console.log(req.params.id);
// Purchase.findById(req.params.id,function(err,information){
// var customer_name=information.customername;

// Purchase.findByIdAndDelete(req.params.id, function (err) {
//   if(err) console.log(err);
//   console.log("Successful deletion");
// var amountdelete=0;
// var query = { customername : customer_name };
// var data = {totalamount :  amountdelete}
// TotalAmount.updateOne(query,data,(err,collection) => {
//   if(err) throw err;
//   console.log("Record updated successfully");
//   console.log(collection);
// })
// })
// res.redirect("/purchases")
// })
// })




// router.get('/printreceiptadmin',function(req,res){
//   username=req.session.username;
//   Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//   res.render('pages/printreceiptadmin',{firstname:firstname,lastname:lastname,image:image,
//   id:id});
  
  
//   })
// })
// router.get('/printreceipt',function(req,res){
//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//     res.render('pages/printreceipt',{firstname:firstname,lastname:lastname,image:image,
//     id:id});
    
    
//     })
// })
// router.get('/search',function(req,res){
    
// res.redirect('printreceipt')


// })
// router.get('/adminsearch',function(req,res){
    
//   res.redirect('printreceiptadmin')
  
  
//   })
  // router.get('/createuser',function(req,res){
  //   username=req.session.username;
  //   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
  //     for(i=0;i<docs.length;i++){
  //       var id=docs[i].id;
  //       var firstname=docs[i].firstname;
  //       var lastname=docs[i].lastname;
  //       var image=docs[i].image;
  //     }
  //       res.render('pages/createuser',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),id:id,image:image,firstname:firstname,lastname:lastname});
      
      
       
  //     })
  // })

// router.get('/signupandsignin',function(req,res){
//     res.render('pages/signupandsignin',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//     })
// router.get('/userlogin',function(req,res){
//   res.redirect("/signupandsignin")
// })


// router.post('/createuser',async function(req,res){
// var firstname=req.body.firstname;
// var lastname=req.body.lastname;
// var username=req.body.username;
// var password=md5(req.body.password);
// var password1=md5(req.body.password1);

// const { image } = req.files;
// image.mv(path.resolve(__dirname, '../public/posts/', image.name));
// try {
//     //listing messages in users mailbox 
//       let signup = await new Register({
//         firstname:firstname,
//         lastname:lastname,
//         username:username,
//         password:password,
//         password:password1,
//         image: `/posts/${image.name}`
//     })
//     signup.save();
//     username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
//       req.flash('server-success',"You have successfully created an account proceed to signin")
//       res.render('pages/createuser',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),id:id,image:image,firstname:firstname,lastname:lastname});
    
  
   
//   })
//     } 
//     catch (err) {
//       next(err);
//     }

//  })
    


//  router.post('/adminsearch',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Purchase.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/adminsearch',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })

// router.get('/viewpurchases',function(req,res){
//  res.redirect("/viewpuchases");

// })

// router.post('/allsuppliers',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Supplier.find({'suppliername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/viewsuppliers',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })



// router.post('/allstocks',function(req, res) {
//   var search=req.body.search;
//   const invoice=Math.random().toString().substring(4,12);

// Add.find({'itemname' : new RegExp(search, 'i')}, function(err, purchase){
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/viewadminitem',{purchase:purchase,firstname:firstname,lastname:lastname,image:image,id:id,invoice:invoice}) 
// })
 
//    })
 

// })




// router.post('/allusers',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Register.find({'username' : new RegExp(search, 'i')}, function(err, purchase){
   
  
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/viewusers',{purchase:purchase,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
 

// })















// router.post('/allsuppliersadmin',function(req, res) {
//   var search=req.body.search;
//   console.log(search)

// Supplier.find({'suppliername' : new RegExp(search, 'i')}, function(err, purchase){
   
//    TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//    for(i=0;i<total.length;i++){
//        var full=total[i].totalamount;
//        var name=total[i].customername;
//    }
//    username=req.session.username;
//  Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//  for(i=0;i<docs.length;i++){
//    var id=docs[i].id;
//    var firstname=docs[i].firstname;
//    var lastname=docs[i].lastname;
//    var image=docs[i].image;
//  }
  
//    res.render('pages/viewsuppliersadmin',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
// })
 
//    })
//  })

// })











// router.post('/search',function(req, res) {
//      var search=req.body.search;
//      console.log(search)
  
//   Purchase.find({'customername' : new RegExp(search, 'i')}, function(err, purchase){
      
//       TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
//       for(i=0;i<total.length;i++){
//           var full=total[i].totalamount;
//           var name=total[i].customername;
//       }
//       username=req.session.username;
//     Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//     for(i=0;i<docs.length;i++){
//       var id=docs[i].id;
//       var firstname=docs[i].firstname;
//       var lastname=docs[i].lastname;
//       var image=docs[i].image;
//     }
     
//       res.render('pages/search',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
//   })
    
//       })
//     })
   
// })
//for the admin route

// router.post('/see',async function(req,res){
//   var firstname=req.body.firstname;
//   var lastname=req.body.lastname;
//   var username=req.body.username;
//   var password=md5(req.body.password);
//   var password1=md5(req.body.password1);
  
//   const { image } = req.files;
//   image.mv(path.resolve(__dirname, '../public/posts/', image.name));
//   try {
//       //listing messages in users mailbox 
//         let signup = await new Admin({
//           firstname:firstname,
//           lastname:lastname,
//           username:username,
//           password:password,
//           password:password1,
//           image: `/posts/${image.name}`
//       })
//       signup.save();
//       req.flash('server-success',"You have successfully created an account proceed to signin")
//         res.render('pages/signupandsignin',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//       } 
//       catch (err) {
//         next(err);
//       }



// })










// router.post('/admin',function(req,res){
//     req.session.username=req.body.username;
//     var username=req.session.username;
//    req.session.password=req.body.password;
//    var password=md5(req.body.password);
//    var username1=req.body.username;
//     Admin.findOne({username:username},function(err,founduser,foundname){
//      if(!founduser){
//   console.log("incorrect credentials")
//   var warning="incorrect credentials";
//   req.flash('server-error',"incorrect credentials entered")
//       return res.render("pages/adminlogin",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})

//     }
//     if(founduser.password !=password){
//       console.log("incorrect credentials")
//       req.flash('server-error',"incorrect credentials")
//       res.render("pages/adminlogin",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
//     }
  
//      if(founduser.password===password || founduser.role==="Admin"){
//       // console.log(founduser.age)
//      var firstname=founduser.firstname;
//      var lastname=founduser.lastname;
//      var id=founduser.id;
//       // return res.render("user",{firstname:firstname,lastname:lastname,id:id})
//       res.redirect(url.format({
//         pathname:"/adminhome",
//         query: {
//            firstname: firstname,
//            lastname:lastname
//             }
//       })); } })})


    //   router.get('/adminhome',function(req,res){
    //     username=req.session.username;
    //     Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      
    //     for(i=0;i<docs.length;i++){
    //       var id=docs[i].id;
    //       var firstname=docs[i].firstname;
    //       var lastname=docs[i].lastname;
    //       var image=docs[i].image;
    //     }
    //     res.render("pages/adminhome",{username:username,id:id,firstname:firstname,lastname:lastname,image:image});
    //     })
    
    // })
// router.post('/accounteditinfo:id',function(req,res){
//   var id=req.params.id;
//   var firstname=req.body.firstname;
//   var lastname=req.body.lastname;
//   var username=req.body.username;
//   var password=req.body.password;
//   var password1=req.body.password1;
//    const { image } = req.files;
//    if(firstname===""){
//      req.flash("please enter the firstname");
//      res.redirect("/accounteditinfo"+id);
//    }else if(lastname===""){
//      req.flash("please enter the lastname")
//    res.redirect("/accounteditinfo"+id);
//   }else if(username===""){
//     req.flash("please enter the username")
//     res.redirect("/accounteditinfo"+id);
//   }else if(password===""){
//     req.flash("please enter the first password");
//     res.redirect("/accounteditinfo"+id);
//   }else if(password1===""){
//    req.flash("please enter the second password");
//    res.redirect("/accounteditinfo"+id);
//   }
//   else{

//    image.mv(path.resolve(__dirname, '../public/posts/', image.name));
//   Admin.findByIdAndUpdate(id, {firstname:firstname,lastname:lastname,username:username,password:password,password1:password1,image: `/posts/${image.name}`}, 
//     function (err, docs) { 
  
// if (err){ 
// console.log(err) 
// } 
// else{ 

// } 
// // req.flash('server-success',"You have updated your information successfully")
// console.log("information inserted successfully");
// req.flash('server-success',"Data inserted  successfully");
// res.redirect("/accounteditinfo"+id);
    
// }); 
// }
// })
  

    

// router.get('/accounteditinfo:id',function(req,res){
//  var id=req.params.id;
//  username=req.session.username;
//  Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
  
//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//    res.render('pages/accounteditinfo',{id:id,firstname:firstname,lastname:lastname,image:image
//   ,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
// })
// })



// router.get('/adminchangepassword:id',function(req,res){
//   username=req.session.username;
//   Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
   
//    for(i=0;i<docs.length;i++){
//      var id=docs[i].id;
//      var firstname=docs[i].firstname;
//      var lastname=docs[i].lastname;
//      var image=docs[i].image;
//    }
//     res.render('pages/adminchangepassword',{id:id,firstname:firstname,lastname:lastname,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//  })
// })


// router.post('/adminchangepassword:id',function(req,res){
// var id=req.params.id;
// var oldpassword=md5(req.body.password);
// var newpassword=md5(req.body.password1);
// if(oldpassword===""){
// req.flash("please enter the old password");
// res.redirect("/adminchangepassword"+id);
// }
// else if(newpassword===""){
//   req.flash("please enter the new password")
//   res.redirect("/adminchangepassword"+id)
// }
// else{
// Admin.findOne({password:oldpassword},function(err,founduser){
//   if(!founduser){
//   console.log("error")
  
//   // req.flash('server-error',"The password you have entered does not match our records please try again")
//   res.redirect("/adminchangepassword"+id)
//   }
//   else{
//   console.log("correct")
  
//   Admin.findByIdAndUpdate(id,{password:newpassword},function(err,docs){
  
//     if(err){
//       console.log(err)
//     }
//     else{
//       console.log("updated")
//       // req.flash('server-success',"Password updated successfully")
//       req.flash('server-success',"Password changed  successfully");
//       res.redirect("/adminchangepassword"+id)

//       //password =1234567
//     }
//   })
  
//   }
  
//   })
// }
// })

// router.get('/forgotuserpassword',function(req,res){
  
//   res.render('pages/forgotuserpassword',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
// })


// router.post('/forgotuserpassword',function(req,res){  
//   var username=req.body.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
//     for(i=0;i<docs.length;i++){
//       var username=docs[i].username; 
//    } if(username){
  
//       console.log("hello")
//   var password1=md5(req.body.password);
//       var query = { username : username };
//       var data = {password :  password1}
//     Register.updateOne(query,data,(err,collection) => {
//         if(err) throw err;
//         req.flash('server-success',"Password reset succesful sign in ");
//       res.status(200).render('pages/forgotuserpassword',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//         console.log("Record updated successfully");
//         console.log(collection);
//     })
//     }else{
//       console.log("error")
//       req.flash('server-error',"The username entered is not correct please try again");
//       res.status(200).render('pages/forgotuserpassword',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
      
//     }
//     })
//   })








// router.get('/useraccountedit:id',function(req,res){
//   var id=req.params.id;
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
   
//    for(i=0;i<docs.length;i++){
//      var id=docs[i].id;
//      var firstname=docs[i].firstname;
//      var lastname=docs[i].lastname;
//      var image=docs[i].image;
//    }
//     res.render('pages/useraccountedit',{id:id,firstname:firstname,lastname:lastname,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//  })



// })


// router.post('/useraccountedit:id',function(req,res){
//   var id=req.params.id;
//   var firstname=req.body.firstname;
//   var lastname=req.body.lastname;
//   var username=req.body.username;
//   var password=md5(req.body.password);
//   var password1=md5(req.body.password1);
//   if(firstname===""){
//     req.flash("please enter the firstname");
//     res.redirect("/useraccountedit"+id);
//   }else if(lastname===""){
//     req.flash("please enter the lastname")
//   res.redirect("/useraccountedit"+id);
//  }else if(username===""){
//    req.flash("please enter the username")
//    res.redirect("/useraccountedit"+id);
//  }else if(password===""){
//    req.flash("please enter the first password");
//    res.redirect("/useraccountedit"+id);
//  }else if(password1===""){
//   req.flash("please enter the second password");
//   res.redirect("/useraccountedit"+id);
//  }
//  else{
//    const { image } = req.files;
//    image.mv(path.resolve(__dirname, '../public/posts/', image.name));
//   Register.findByIdAndUpdate(id, {firstname:firstname,lastname:lastname,username:username,password:password,password1:password1,image: `/posts/${image.name}`}, 
//     function (err, docs) {  
// if (err){ 
// console.log(err) 
// } 
// else{ 
// } 
// req.flash('server-success',"You have updated your information successfully")
// console.log("information inserted successfully");
// res.redirect("/useraccountedit"+id);
// }); 
//  }
// })
  

// router.get('/userpasswordchange:id',function(req,res){
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
   
//    for(i=0;i<docs.length;i++){
//      var id=docs[i].id;
//      var firstname=docs[i].firstname;
//      var lastname=docs[i].lastname;
//      var image=docs[i].image;
//    }
//     res.render('pages/userpasswordchange',{id:id,firstname:firstname,lastname:lastname,image:image,
//       serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
//  })


// })


// router.post('/userpasswordchange:id',function(req,res){
//   var id=req.params.id;
//   var oldpassword=md5(req.body.password);
//   var newpassword=md5(req.body.password1);
//   if(oldpassword===""){
// req.flash('server-error',"please enter your old password");
// res.redirect("/userpasswordchange"+id);
//   }
//   else if(newpassword===""){
//     req.flash('server-error',"please enter a new password");
//     res.redirect("/userpasswordchange"+id);
//   }
//   else{
//   Register.findOne({password:oldpassword},function(err,founduser){
//     if(!founduser){
//     console.log("error")
    
//     req.flash('server-error',"The password you have entered does not match our records");
//     res.redirect("/userpasswordchange"+id)
//     }
//     else{
//     console.log("correct")
    
//     Register.findByIdAndUpdate(id,{password:newpassword},function(err,docs){
    
//       if(err){
//         console.log(err)
//       }
//       else{
//         console.log("updated")
//         req.flash('server-success',"Password updated successfully");
//         res.redirect("/userpasswordchange"+id)
        
//       }
//     })
    
//     }
    
//     })
//   }
//   })



// router.get('/allusers',(req,res)=>{
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){

//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
  
//   Register.find({},function(err,sales){
//            console.log(sales)
//       res.render('pages/allusers',{sales:sales,firstname:firstname,lastname:lastname,image:image,id:id});
//               })
// })
  
// })

// router.get('/admindailysales',(req,res)=>{
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//   res.render("pages/admindailysales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),id:id,firstname:firstname,lastname:lastname,image:image})
// })
// })









// router.get('/dailysales',(req,res)=>{
//   username=req.session.username;
//   Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
//   for(i=0;i<docs.length;i++){
//     var id=docs[i].id;
//     var firstname=docs[i].firstname;
//     var lastname=docs[i].lastname;
//     var image=docs[i].image;
//   }
//   res.render("pages/dailysales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),id:id,firstname:firstname,lastname:lastname,image:image})
// })
// })


// router.get('/logout',(req,res)=>
//   {
//   req.session.destroy((err)=>{})
//  res.redirect("/signupandsignin")
//   })

  add("fufu",2,5);
  const name=new add("ama",2,3);
  
module.exports = router;

