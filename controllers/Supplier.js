const Supplier=require('../models/suppliermodel');
const Register=require('../models/registermodel');
const Admin=require('../models/adminmodel');
const Add = require('../models/addmodels');

exports.supplierInformation=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
        var id=req.params.id;
       Supplier.findById(id,function(err,information){
           if(err){
            res.status(500).send('An error occured please try again');
           }
           var suppliername=information.suppliername;
           var Phonenumber=information.Phonenumber;
           var Items=information.Items;
           username=req.session.username;
       Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
       for(i=0;i<docs.length;i++){
         var id=docs[i].id;
         var firstname=docs[i].firstname;
         var lastname=docs[i].lastname;
         var image=docs[i].image;
       } 
 res.render('pages/supplierinformation',{suppliername:suppliername,Phonenumber:Phonenumber,Items:Items,id:id,firstname:firstname,lastname:lastname,image:image}); 
     })
         })
     }
    exports.supplierAdminInformation=(req,res)=>{
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma' : 'no-cache',
        'Expires' : '0',
    })
            var id=req.params.id;
            Supplier.findById(id,function(err,information){
               var suppliername=information.suppliername;
               var Phonenumber=information.Phonenumber;
               var Items=information.Items;
               username=req.session.username;
           Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
           for(i=0;i<docs.length;i++){
             var id=docs[i].id;
             var firstname=docs[i].firstname;
             var lastname=docs[i].lastname;
             var image=docs[i].image;
           }
               res.render('pages/supplieradmininformation',{suppliername:suppliername,Phonenumber:Phonenumber,Items:Items,id:id,firstname:firstname,lastname:lastname,image:image});
          })
             })
     }

     exports.getSuppliersEdit=(req,res)=>{
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma' : 'no-cache',
        'Expires' : '0',
    })
          var username=req.session.username;
           Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
             for(i=0;i<docs.length;i++){
               var id=docs[i].id;
               var firstname=docs[i].firstname;
               var lastname=docs[i].lastname;
               var image=docs[i].image;
       }
           var id=req.params.id;
            Add.find({},function(err,sales){
          res.render('pages/suppliersedit',{sales:sales,id:id,firstname:firstname,lastname:lastname
         ,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
                  })  
               })
     }

     exports.getSuppliersAdminEdit=(req,res)=>{
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma' : 'no-cache',
        'Expires' : '0',
    })
           var username=req.session.username;
           Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
             for(i=0;i<docs.length;i++){
               var id=docs[i].id;
               var firstname=docs[i].firstname;
               var lastname=docs[i].lastname;
               var image=docs[i].image;
           }
           var id=req.params.id;
            Add.find({},function(err,sales){
          res.render('pages/suppliersadminedit',{sales:sales,id:id,firstname:firstname,lastname:lastname
         ,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
                  })
               })
     }


     exports.postSupplierEdit=(req,res)=>{
            var id=req.params.id;//get the id 
            var suppliername=req.body.suppliername;
            var Phonenumber=req.body.phonenumber;
            var item=req.body.item;
            if(suppliername===""){
              req.flash('server-error'," Please enter the Supplier's name");
              res.redirect("/suppliersedit"+id)
            }else if(Phonenumber===""){
              req.flash('server-error'," Please enter the Supplier's phonenumber");
              res.redirect("/suppliersedit"+id)
            }else if(item===""){
              req.flash('server-error'," Please enter the item name to supply");
              res.redirect("/suppliersedit"+id)
            }
            else{
              Supplier.findByIdAndUpdate(id, { suppliername:suppliername,Phonenumber:Phonenumber,Items:item}, 
                                             function (err, docs) { 
                     console.log("information inserted successfully");
                     req.flash('server-success',"Supplier's information updated successfully");
                     res.redirect("/suppliersedit"+id);
                 }); 
            }
     }

     exports.postSupplierAdminEdit=(req,res)=>{
                var id=req.params.id;//get the id 
                var suppliername=req.body.suppliername;
                var Phonenumber=req.body.phonenumber;
                var item=req.body.item;
            if(suppliername===""){
              req.flash('server-error',"please enter supplier's name")
              res.redirect("/suppliersadminedit"+id);
            }
            else if(Phonenumber===""){
              req.flash('server-error',"please enter supplier's phonenumber");
              res.redirect("/suppliersadminedit"+id);
            }else if(item===""){
            req.flash('server-error',"please enter items supplied");
            res.redirect("/suppliersadminedit"+id);
            }else{
            
                Supplier.findByIdAndUpdate(id, { suppliername:suppliername,Phonenumber:Phonenumber,Items:item}, 
                                               function (err, docs) { 
                       // req.flash('server-success',"You have updated your information successfully")
                       console.log("information inserted successfully");
                       req.flash('server-success',"information successfully updated")
                       res.redirect("/suppliersadminedit"+id);
                   });           
                  }      
     }

     exports.getSupplier=(req,res)=>{
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
    res.render('pages/addsuppliers',{firstname:firstname,lastname:lastname,image:image,id:id,
      serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
})
     }


     exports.postadminSupplier=(req,res)=>{
            username=req.session.username;
            Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){
            for(i=0;i<docs.length;i++){
              var id=docs[i].id;
              var firstname=docs[i].firstname;
              var lastname=docs[i].lastname;
              var image=docs[i].image;
             } 
          var suppliername=req.body.suppliername;
          var phone=req.body.phonenumber;
          var item=req.body.item;
          
          if(suppliername===""){
            req.flash('server-error'," Please enter the Supplier's name");
            res.redirect("/adminsupplier")
          }else if(phone===""){
            req.flash('server-error'," Please enter the Supplier's phonenumber");
            res.redirect("/adminsupplier")
          }else if(item===""){
            req.flash('server-error'," Please enter the item name to supply");
            res.redirect("/adminsupplier")
          }
          else{
          const supply=new Supplier({
                  suppliername:suppliername,
                  Phonenumber:phone,
                  Items:item})
            const check=supply.save();
          if(check){
              console.log("successful");
               req.flash('server-success',"Data inserted  successfully");
              res.redirect("/adminsupplier")
                
          }else{
              console.log("error while adding supplier")
               req.flash('server-error'," error while adding supplier");
            res.redirect("/adminsupplier")
          }
            } 
          })
     }


     exports.getadminSupplier=(req,res)=>{
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
              res.render('pages/addsuppliersadmin',{firstname:firstname,lastname:lastname,image:image,id:id,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')})
            })    
     }

     exports.postSupplier=(req,res)=>{
          var suppliername=req.body.suppliername;
          var phone=req.body.phonenumber;
          var item=req.body.item;
            if(suppliername===""){
              req.flash('server-error'," Please enter the Supplier's name");
              res.redirect("/supplier")
            }else if(phone===""){
              req.flash('server-error'," Please enter the Supplier's phonenumber");
              res.redirect("/supplier")
            }else if(item===""){
              req.flash('server-error'," Please enter the item name to supply");
              res.redirect("/supplier")
            }
            else{
            username=req.session.username;
            Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
          
            for(i=0;i<docs.length;i++){
              var id=docs[i].id;
              var firstname=docs[i].firstname;
              var lastname=docs[i].lastname;
              var image=docs[i].image; 
              }   
          const supply=new Supplier({
                  suppliername:suppliername,
                  Phonenumber:phone,
                  Items:item})
            const check=supply.save();
          if(check){
              console.log("successful");
              req.flash('server-success',"Supplier's information added successfully");
              res.redirect("supplier")
            
            }else{
              console.log("error while adding supplier")
          }
            
          })
            }
     }


     exports.getAllSuppliers=(req,res)=>{
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
                Supplier.find({},function(err,sales){
                         console.log(sales)
                    res.render('pages/allsuppliers',{sales:sales,firstname:firstname,lastname:lastname,image:image,id:id});
                    })
            })
     }

 exports.getAllSuppliersAdmin=(req,res)=>{
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
  Supplier.find({},function(err,sales){
           console.log(sales)
      res.render('pages/allsuppliersadmin',{sales:sales,firstname:firstname,lastname:lastname,image:image,id:id});
              })
})
     }

exports.postAllsupplierAdmin=(req,res)=>{
  var search=req.body.search;
  console.log(search)

Supplier.find({'suppliername' : new RegExp(search, 'i')}, function(err, purchase){
   
   TotalAmount.find({'customername' : new RegExp(search, 'i')}, function(err, total){
   for(i=0;i<total.length;i++){
       var full=total[i].totalamount;
       var name=total[i].customername;
   }
   username=req.session.username;
 Admin.find({'username' : new RegExp(username, 'i')}, function(err, docs){

 for(i=0;i<docs.length;i++){
   var id=docs[i].id;
   var firstname=docs[i].firstname;
   var lastname=docs[i].lastname;
   var image=docs[i].image;
 }
  
   res.render('pages/viewsuppliersadmin',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
})
 
   })
 })
 }

 exports.postAllsuppliers=(req,res)=>{
    var search=req.body.search;
  Supplier.find({'suppliername' : new RegExp(search, 'i')}, function(err, purchase){
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
    
     res.render('pages/viewsuppliers',{purchase:purchase,full:full,name:name,firstname:firstname,lastname:lastname,image:image,id:id}) 
  })
   
     })
   })
 }


 exports.getsuppliersDelete=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
        Supplier.findByIdAndDelete(req.params.id, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
            res.redirect("/allsuppliers")
    })
 }