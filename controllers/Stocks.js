const Admin=require('../models/adminmodel');
const Add = require('../models/addmodels');
const Register=require('../models/registermodel');
const todayDate=require('../date');
//allstocks
exports.allStocks=(req,res)=>{
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
        Add.find({},function(err,additems){
        if(additems.length<1){
            res.render('pages/checkpage',{firstname:firstname,lastname:lastname,image:image,id:id});
            }else{
                for(i=0;i<additems.length;i++){
                    var id=additems[i].id;
                    var reduce=id.slice(0,8);//slice the id to the last 8 digits
                }
            res.render('pages/allstocks',{additems:additems,reduce:reduce,firstname:firstname,lastname:lastname,image:image,id:id});
            }
        })
    })
}

exports.postAllstocks=(req,res)=>{
        var search=req.body.search;
        const invoice=Math.random().toString().substring(4,12);
      Add.find({'itemname' : new RegExp(search, 'i')}, function(err, purchase){
         username=req.session.username;
       Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
       for(i=0;i<docs.length;i++){
         var id=docs[i].id;
         var firstname=docs[i].firstname;
         var lastname=docs[i].lastname;
         var image=docs[i].image;
       }
         res.render('pages/viewadminitem',{purchase:purchase,firstname:firstname,lastname:lastname,image:image,id:id,invoice:invoice}) 
      }) 
         })
}
exports.getaddItems=(req,res)=>{
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
         res.render('pages/AddItems',{id:id,firstname:firstname,lastname:lastname,image:image,serverSucess:req.flash('server-success'),serverError:req.flash('server-error')});
      })
}

exports.postAdditems=(req,res)=>{
       var getDate=todayDate();
        var itemname=req.body.itemname.toUpperCase();
       var itemprice=parseFloat(req.body.itemprice);
      var  itemquantity=req.body.itemquantity;
      var pieceperquantity= parseFloat(req.body.pieceperquantity);
      var total=parseFloat(req.body.total);
       if(itemname===""){
       req.flash('server-error'," Please enter the item name");
       res.redirect("/additems")
     }else if(itemprice===""){
       req.flash('server-error'," Please enter the price of the item");
       res.redirect("/additems")
     } else if(itemquantity===""){
       req.flash('server-error'," Please enter the quantity of the item");
       res.redirect("/additems")
     }
     else if(pieceperquantity===""){
       req.flash('server-error'," Please enter the pieces per item");
       res.redirect("/additems")
     }
     else if(total===""){
       req.flash('server-error'," Please enter the total amount");
       res.redirect("/additems")
     }
   else{
   Add.find({'itemname' : new RegExp(itemname, 'i')}, function(err, docs){
      if(itemname.length>1){
          for(i=0;i<docs.length;i++){
          var existing_item=docs[i].itemquantity;
          console.log(existing_item)
      var new_items=parseFloat(existing_item)+parseFloat(itemquantity);
          }
          var query = { itemname : itemname };//check where there is an item and update
          var data = {itemquantity : new_items }
        Add.updateOne(query,data,(err,collection) => {
            if(err) throw err;
            console.log("Record updated successfully");
            console.log(collection);
        })
        Add.find({'itemname' : new RegExp(itemname, 'i')}, function(err, docs){
               if(docs.length<1) {
                   const admindata=new Add(
                           {
                              itemname:itemname,
                              itemprice:itemprice,
                              itemquantity:itemquantity,
                              pieceperquantity:pieceperquantity,
                              total:total,
                              date:getDate,            
                           });        
                       admindata.save();
               }            
        })
      }
   })
   req.flash('server-success',"Items added successfully");
   res.redirect("/additems");
   }
}