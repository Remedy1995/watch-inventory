
const Admin=require('../models/adminmodel');
const Register=require('../models/registermodel');
exports.getPrintReceipt=(req,res)=>{
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
    res.render('pages/printreceipt',{firstname:firstname,lastname:lastname,image:image,
    id:id});
    })
}

exports.printreceiptAdmin=(req,res)=>{
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
    res.render('pages/printreceiptadmin',{firstname:firstname,lastname:lastname,image:image,
    id:id});
    })
}


exports.searchReciept=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
    res.redirect('printreceipt')
}

exports.adminReceipt=(req,res)=>{
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
res.redirect('printreceiptadmin')
}