
const Register=require('../models/registermodel');
exports.Chats = (req,res)=>{
    username=req.session.username;
    let firstname = "";
    Register.find({'username' : new RegExp(username, 'i')}, function(err, docs){
      try{
          for(i = 0;i < docs.length; i++){
          firstname = docs[i].firstname;
         }
      }catch(error){
        console.log('my message',error.message)
      }
      res.render("chat",{firstname:firstname})
    })
    

}

