const Admin = require('../models/adminmodel');
const md5 = require('md5');
const Register = require('../models/registermodel');
const path = require('path');
exports.forgotAdminPassword = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  })
  res.render('pages/forgotpassword', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') })

}
exports.PostforgotAdminPassword = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  })
  var username = req.body.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var username = docs[i].username;
    } if (username) {

      console.log("hello")
      var password1 = md5(req.body.password);
      var query = { username: username };
      var data = { password: password1 }
      Admin.updateOne(query, data, (err, collection) => {
        if (err) throw err;
        req.flash('server-success', "Password reset succesful sign in ");
        res.status(200).render('pages/forgotpassword', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') });


        console.log(collection);
      })
    }
    else {
      console.log("error")
      req.flash('server-error', "The username you entered cannot be found please try again");
      return res.status(400).render("pages/forgotpassword", { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') })
    }
  })
}

exports.getAdminChangePassword = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var id = docs[i].id;
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    res.render('pages/adminchangepassword', { id: id, firstname: firstname, lastname: lastname, image: image, serverSucess: req.flash('server-success'), serverError: req.flash('server-error') });
  })
}

exports.postAdminChangePassword = (req, res) => {
  var id = req.params.id;
  var oldpassword = (req.body.password);
  var newpassword = (req.body.password1);
  if (oldpassword === "") {
    req.flash("please enter the old password");
    res.redirect("/adminchangepassword" + id);
  }
  else if (newpassword === "") {
    req.flash("please enter the new password")
    res.redirect("/adminchangepassword" + id)
  }
  else {
    Admin.findOne({ password: oldpassword }, function (err, founduser) {
      if (!founduser) {
        console.log("error")

        req.flash('server-error', "The password you have entered does not match our records please try again")
        res.redirect("/adminchangepassword" + id)
      }
      else {
        console.log("correct")

        Admin.findByIdAndUpdate(id, { password: newpassword }, function (err, docs) {

          if (err) {
            console.log(err)
          }
          else {
            console.log("updated")
            // req.flash('server-success',"Password updated successfully")
            req.flash('server-success', "Password changed  successfully");
            res.redirect("/adminchangepassword" + id)

            //password =1234567
          }
        })

      }

    })
  }
}
exports.getuserForgotPassword = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  })
  res.render('pages/forgotuserpassword', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') })
}

exports.postuserForgotPassword = (req, res) => {
  var username = req.body.username;
  Register.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var username = docs[i].username;
    } if (username) {

      console.log("hello")
      var password1 = md5(req.body.password);
      var query = { username: username };
      var data = { password: password1 }
      Register.updateOne(query, data, (err, collection) => {
        if (err) throw err;
        req.flash('server-success', "Password reset succesful sign in ");
        res.status(200).render('pages/forgotuserpassword', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') });
        console.log("Record updated successfully");
        console.log(collection);
      })
    } else {
      console.log("error")
      req.flash('server-error', "The username entered is not correct please try again");
      res.status(200).render('pages/forgotuserpassword', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') });

    }
  })
}

exports.postcreateUser = async (req, res) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = md5(req.body.password);
  var password1 = md5(req.body.password1);
  const { image } = req.files;
  image.mv(path.resolve(__dirname, '../public/posts/', image.name));
  try {
    //listing messages in users mailbox 
    let signup = await new Register({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      password: password1,
      image: `/posts/${image.name}`
    })
    signup.save();
    username = req.session.username;
    Register.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {

      for (i = 0; i < docs.length; i++) {
        var id = docs[i].id;
        var firstname = docs[i].firstname;
        var lastname = docs[i].lastname;
        var image = docs[i].image;
      }
      req.flash('server-success', "You have successfully created an account proceed to signin")
      res.render('pages/createuser', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error'), id: id, image: image, firstname: firstname, lastname: lastname });



    })
  }
  catch (err) {
    next(err);
  }


}

exports.getCreateUser = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  })
  username = req.session.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var id = docs[i].id;
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    res.render('pages/createuser', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error'), id: id, image: image, firstname: firstname, lastname: lastname });
  })

}


exports.acccountEditId = (req, res) => {
  var id = req.params.id;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  var password1 = req.body.password1;
  const { image } = req.files;
  if (firstname === "") {
    req.flash("please enter the firstname");
    res.redirect("/accounteditinfo" + id);
  } else if (lastname === "") {
    req.flash("please enter the lastname")
    res.redirect("/accounteditinfo" + id);
  } else if (username === "") {
    req.flash("please enter the username")
    res.redirect("/accounteditinfo" + id);
  } else if (password === "") {
    req.flash("please enter the first password");
    res.redirect("/accounteditinfo" + id);
  } else if (password1 === "") {
    req.flash("please enter the second password");
    res.redirect("/accounteditinfo" + id);
  }
  else {

    image.mv(path.resolve(__dirname, '../public/posts/', image.name));
    Admin.findByIdAndUpdate(id, { firstname: firstname, lastname: lastname, username: username, password: password, password1: password1, image: `/posts/${image.name}` },
      function (err, docs) {

        if (err) {
          console.log(err)
        }
        else {

        }
        // req.flash('server-success',"You have updated your information successfully")
        console.log("information inserted successfully");
        req.flash('server-success', "You have updated your information successfully")
        res.redirect("/accounteditinfo" + id);

      });
  }
}


exports.getAccountEdit = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  var id = req.params.id;
  username = req.session.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var id = docs[i].id;
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    res.render('pages/accounteditinfo', {
      id: id, firstname: firstname, lastname: lastname, image: image
      , serverSucess: req.flash('server-success'), serverError: req.flash('server-error')
    });
  })
}