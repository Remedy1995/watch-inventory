const Purchase=require('../models/purchases');
const Register=require('../models/registermodel');
const DailySales=require('../models/dailysales');
const Admin=require('../models/adminmodel');
const url = require('url');
const md5=require('md5');
exports.userInformation=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
        var username=req.session.username;
          var id=req.params.id;
          Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
            for(i=0;i<docs.length;i++){
              var firstname=docs[i].firstname;
              var lastname=docs[i].lastname;
              var image=docs[i].image;
          }
          Purchase.findById(id,function(err,information){
              var price=information.price;
              var invoice=information.invoice;
              var name=information.customername;
              var date=information.date;
              var quantity=information.quantity;
              var quantity1=information.quantity1;
              var amount=information.totalamount;
              var item=information.itemname;
              res.render('pages/information',{information:information,price:price,name:name,invoice:invoice,date:date,item:item,amount:amount,quantity1:quantity1,quantity:quantity,id:id,lastname:lastname,firstname:firstname,image:image});
          })       
      })
}

exports.userDailySales=(req,res)=>{
const date =req.body.date;
username=req.session.username;
Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
for(i=0;i<docs.length;i++){
  var id=docs[i].id;
  var firstname=docs[i].firstname;
  var lastname=docs[i].lastname;
  var image=docs[i].image;
}
DailySales.find({'date' : new RegExp(date, 'i')}, function(err, docs){
 if(docs<1){
  req.flash('server-error',"Please you have no  sales for this day ");
   console.log("you have no  sales for the day")
   return res.render("pages/nosales",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error'),image:image,firstname:firstname,lastname:lastname,id:id,date:date})
 }else{
    for(i=0;i<docs.length;i++)  {
      var totalamount=docs[i].totalamount;
      var date=docs[i].date;
    } 
 }
    res.render("pages/viewsales",{date:date,totalamount:totalamount,firstname:firstname,lastname:lastname,image:image,id:id
    , serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
  })  
})
}


exports.getUserHome=(req,res)=>{
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
        res.render("pages/userhome",{username:username,id:id,firstname:firstname,lastname:lastname,image:image});
        })
    }

    exports.Edit=(req,res)=>{
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma' : 'no-cache',
        'Expires' : '0',
    })
            var username=req.session.username;
            Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
              for(i=0;i<docs.length;i++){ 
                var firstname=docs[i].firstname;
                var lastname=docs[i].lastname;
                var image=docs[i].image;
            }
                var id=req.params.id;
              Purchase.findById(req.params.id, function(err,consultation) {
             var name1=consultation.customername; 
              Add.find({},function(err,sales){
            res.render('pages/edit',{sales:sales,name1:name1,id:id,firstname:firstname,lastname:lastname,image:image
            ,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
                    })
                  })
            })
    }

    exports.postEdit=(req,res)=>{
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
              res.redirect("/edit"+id)
            }
           else if(billdate===""){
             req.flash('server-error',"please update the time")
             res.redirect("/edit"+id)
           }else if(customer_name===""){
             req.flash('server-error',"please enter your name")
             res.redirect("/edit"+id)
           }else if(quantity===""){
             req.flash('server-error',"please enter the quantity")
             res.redirect("/edit"+id)
           }
           else if(quantity1===""){
             req.flash('server-error',"please enter the quantity")
             res.redirect("/edit"+id)
           }
           else if(amount===""){
             req.flash('server-error',"please enter your amount")
             res.redirect("/edit"+id)
           }else if(price===""){
             req.flash('server-error',"please enter the price")
             res.redirect("/edit"+id)
           }else if(item===""){
             req.flash('server-error',"please enter your item bought")
             res.redirect("/edit"+id)
           
             
           }else{
           Purchase.findByIdAndUpdate(id, { invoice:invoice,date:billdate,customername:customer_name,itemname:item,quantity:quantity,quantity1:quantity1,totalamount:amount,price:price}, 
                                           function (err, docs) { 
                                         
                                             var setNewAmount=amount;
                                             var query = { customername : customer_name };
                                             var data = {totalamount :  setNewAmount}
                                           TotalAmount.updateOne(query,data,(err,collection) => {
                                               if(err) throw err;
                                               console.log("Record updated successfully");
                                               console.log(collection);
                                           })
                   // req.flash('server-success',"You have updated your information successfully")
                   console.log("information inserted successfully");
                   req.flash('server-success',"information has been succesfully updated")
                   res.redirect("/edit"+id);
                  
               }); 
             } 
        }


        exports.postUserLogin=(req,res)=>{
                    req.session.username=req.body.username;
                    var username=req.session.username;
                   req.session.password=req.body.password;
                   var password=md5(req.session.password);
                   var username1=req.body.username;
                    Register.findOne({username:username},function(err,founduser){
                     if(!founduser){
                  console.log("incorrect credentials")
                  req.flash('server-error',"Incorrect credentials try again")
                      return res.render("pages/signupandsignin",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
                    }
                    if(founduser.password !=password){
                      console.log("incorrect credentials")
                      req.flash('server-error',"Incorrect credentials try again")
                      res.render("pages/signupandsignin",{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
                    }
                  
                     if(founduser.password===password || founduser.role==="Admin"){
                      res.cookie("role","user",{
                        maxAge: 5000,
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax'
                    });
                      // console.log(founduser.age)
                     var firstname=founduser.firstname;
                     var lastname=founduser.lastname;
                     var id=founduser.id;
                      // return res.render("user",{firstname:firstname,lastname:lastname,id:id})
                 
                      res.redirect(url.format({
                        pathname:"/userhome",
                        query: {
                           firstname: firstname,
                           lastname:lastname
                            }
                      })); 
                    } 
                })
        }


      exports.getuserLogin=(req,res)=>{
      res.redirect("/signupandsignin")
        }
exports.getSignupandsignin=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
    res.render('pages/signupandsignin',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
}


exports.postAllusers=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  var search=req.body.search;
Register.find({'username' : new RegExp(search, 'i')}, function(err, purchase){
   username=req.session.username;
 Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
 for(i=0;i<docs.length;i++){
   var id=docs[i].id;
   var firstname=docs[i].firstname;
   var lastname=docs[i].lastname;
   var image=docs[i].image;
 }  
   res.render('pages/viewusers',{purchase:purchase,firstname:firstname,lastname:lastname,image:image,id:id}) 
})
 
   })

}

exports.usersDelete=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
      Register.findByIdAndDelete(req.params.id, function (err) {
          if(err) console.log(err);
          console.log("Successful deletion");
          res.redirect("/allusers")
    })
}


exports.userAccountEdit=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
    var id=req.params.id;
    username=req.session.username;
    Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){  
     for(i=0;i<docs.length;i++){
       var id=docs[i].id;
       var firstname=docs[i].firstname;
       var lastname=docs[i].lastname;
       var image=docs[i].image;
     }
    res.render('pages/useraccountedit',{id:id,firstname:firstname,lastname:lastname,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
   })
}

exports.postuserAccountEdit=(req,res)=>{
    var id=req.params.id;
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var username=req.body.username;
    var password=md5(req.body.password);
    var password1=md5(req.body.password1);
    if(firstname===""){
      req.flash("please enter the firstname");
      res.redirect("/useraccountedit"+id);
    }else if(lastname===""){
      req.flash("please enter the lastname")
    res.redirect("/useraccountedit"+id);
   }else if(username===""){
     req.flash("please enter the username")
     res.redirect("/useraccountedit"+id);
   }else if(password===""){
     req.flash("please enter the first password");
     res.redirect("/useraccountedit"+id);
   }else if(password1===""){
    req.flash("please enter the second password");
    res.redirect("/useraccountedit"+id);
   }
   else{
     const { image } = req.files;
     image.mv(path.resolve(__dirname, '../public/posts/', image.name));
    Register.findByIdAndUpdate(id, {firstname:firstname,lastname:lastname,username:username,password:password,password1:password1,image: `/posts/${image.name}`}, 
      function (err, docs) {  
  if (err){ 
  console.log(err) 
  } 
  else{ 
  } 
  req.flash('server-success',"You have updated your information successfully")
  console.log("information inserted successfully");
  res.redirect("/useraccountedit"+id);
  }); 
   }
}


exports.getuserPasswordChange=(req,res)=>{
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
      res.render('pages/userpasswordchange',{id:id,firstname:firstname,lastname:lastname,image:image,
        serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
   })
}


exports.postuserPasswordChange=(req,res)=>{
    var id=req.params.id;
    var oldpassword=md5(req.body.password);
    var newpassword=md5(req.body.password1);
    if(oldpassword===""){
  req.flash('server-error',"please enter your old password");
  res.redirect("/userpasswordchange"+id);
    }
    else if(newpassword===""){
      req.flash('server-error',"please enter a new password");
      res.redirect("/userpasswordchange"+id);
    }
    else{
    Register.findOne({password:oldpassword},function(err,founduser){
      if(!founduser){
      console.log("error")
      
      req.flash('server-error',"The password you have entered does not match our records");
      res.redirect("/userpasswordchange"+id)
      }
      else{
      console.log("correct")
      
      Register.findByIdAndUpdate(id,{password:newpassword},function(err,docs){
      
        if(err){
          console.log(err)
        }
        else{
          console.log("updated")
          req.flash('server-success',"Password updated successfully");
          res.redirect("/userpasswordchange"+id)
          
        }
      })
      
      }
      
      })
    }
  }


  exports.getAllUsers=(req,res)=>{
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
      Register.find({},function(err,sales){
          res.render('pages/allusers',{sales:sales,firstname:firstname,lastname:lastname,image:image,id:id});
            
          // res.send(sales);
          // res.end('{"message" :"Success" ,"status" :"200"}')     
        
        })
    })
  }

  exports.logout=(req,res)=>{
    console.log('logout',req.session.username)
  req.session.destroy(err=>{
    if(err){
      console.log('cannot logout',err)
    }
    else{
      // res.setHeader('Expires','-1');
      // res.setHeader('Cache-Control','no-cache,no-store,must-revalidate');
      // res.setHeader('Pragma','no-cache');
      // res.clearCookie();
      // console.log('you have logout',req.session)
      res.redirect('/')
    }
  })
  // })

  }


  exports.checkPage=(req,res)=>{
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
      res.render('pages/checkpage',{lastname:lastname,firstname:firstname,image:image});
  })
  }

  exports.home=(req,res)=>{
  //   res.set({
  //     'Cache-Control': 'no-cache, no-store, must-revalidate',
  //     'Pragma' : 'no-cache',
  //     'Expires' : '0',
  // })
    console.log('you are on the landing page',req.session.username);
   console.log(req.cookies.role,typeof(req.cookies.role))
  res.render('pages/signupandsignin',{serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
  }