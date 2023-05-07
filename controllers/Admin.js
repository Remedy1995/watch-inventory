
const Admin = require('../models/adminmodel');
const Purchase = require('../models/purchases');
const DailySales = require('../models/dailysales');
const Add = require('../models/addmodels');
const url = require('url');
const TotalAmount = require('../models/totalamount');
const md5 = require('md5');

exports.Admin = (req, res) => {
  username = req.session.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var id = docs[i].id;
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    res.render('pages/adminhome', { firstname: firstname, lastname: lastname, image: image, id: id })
  })
}


exports.getAdminInformation = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  var username = req.session.username;
  var id = req.params.id;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    Purchase.findById(id, function (err, information) {
      var price = information.price;
      var invoice = information.invoice;
      var name = information.customername;
      var date = information.date;
      var quantity = information.quantity;
      var quantity1 = information.quantity1;
      var amount = information.totalamount;
      var item = information.itemname;
      res.render('pages/admininformation', { information: information, price: price, name: name, invoice: invoice, date: date, item: item, amount: amount, quantity: quantity, quantity1: quantity1, id: id, lastname: lastname, firstname: firstname, image: image });
    })
  })
}

exports.adminDailySales = (req, res) => {
  const date = req.body.date;
  username = req.session.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {

    for (i = 0; i < docs.length; i++) {
      var id = docs[i].id;
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    DailySales.find({ 'date': new RegExp(date, 'i') }, function (err, docs) {
      if (docs < 1) {
        req.flash('server-error', "Please you have no  sales for this day ");
        console.log("you have no  sales for the day")
        return res.render("pages/adminnosales", { serverSucess: req.flash('server-success'), serverError: req.flash('server-error'), image: image, firstname: firstname, lastname: lastname, id: id, date: date })
      } else {
        for (i = 0; i < docs.length; i++) {
          var totalamount = docs[i].totalamount;
          var date = docs[i].date;
        }
      }
      res.render("pages/adminviewsales", {
        date: date, totalamount: totalamount, firstname: firstname, lastname: lastname, image: image, id: id
        , serverSucess: req.flash('server-success'), serverError: req.flash('server-error')
      })
    })
  })
}

exports.getAdminItemsEdit = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  var id = req.params.id;
  var username = req.session.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    Add.findById(id, function (err, information) {
      var item = information.itemname;
      var itemprice = information.itemprice;
      var itemquantity = information.itemquantity;
      var date = information.date;
      var total = information.total;
      Add.find({}, function (err, sales) {
        res.render('pages/adminitemsedit', {
          sales: sales, id: id, item: item, itemprice: itemprice, itemquantity: itemquantity, date: date, firstname: firstname, lastname: lastname, image: image, total: total,
          serverSucess: req.flash('server-success'), serverError: req.flash('server-error')
        });
      })
    })
  })
}


exports.postAdminItemsEdit = (req, res) => {
  var id = req.params.id;//get the id 
  var billdate = req.body.date;
  var quantity = req.body.quantity;
  var price = req.body.itemprice;
  var item = req.body.itemlist;
  var total = req.body.total;
  if (billdate === "") {
    req.flash('server-error', "please enter the billdate")
    res.redirect("/adminitemsedit" + id);
  }
  else if (quantity === "") {
    req.flash('server-error', "please enter the quantity");
    res.redirect("/adminitemsedit" + id);
  }
  else if (price === "") {
    req.flash('server-error', "please enter the price");
    res.redirect("/adminitemsedit" + id);
  }
  else if (item === "") {
    req.flash('server-error', "please enter the item");
    res.redirect("/adminitemsedit" + id);
  }
  else if (total === "") {
    req.flash('server-error', "please enter the total");
    res.redirect("/adminitemsedit" + id);
  } 
  else if (item === "Select items") {
    req.flash('server-error', "please select an item");
    res.redirect("/adminitemsedit" + id);
  }
  else {
    console.log('The value of item',item)
    var parseprice = parseFloat(price)
    var parsequantity = parseFloat(quantity)
    var parsetotal = parseFloat(total)
    Add.findByIdAndUpdate(id, { itemname: item, date: billdate, itemprice: parseprice, itemquantity: parsequantity, total: parsetotal },
      function (err, docs) {
        req.flash('server-success', "information inserted successfully");
        res.redirect("/adminitemsedit" + id);
      });
  }
}

exports.getAdminDelete = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  var id = req.params.id;
  Add.findByIdAndDelete(id, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
    res.redirect("/allstocks")
  })
}



exports.getadmin = (req, res) => {
  res.render('pages/adminlogin', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') });
}


exports.AdminSearch = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  var search = req.body.search;
  Purchase.find({ 'customername': new RegExp(search, 'i') }, function (err, purchase) {
    TotalAmount.find({ 'customername': new RegExp(search, 'i') }, function (err, total) {
      for (i = 0; i < total.length; i++) {
        var full = total[i].totalamount;
        var name = total[i].customername;
      }
      username = req.session.username;
      Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {

        for (i = 0; i < docs.length; i++) {
          var id = docs[i].id;
          var firstname = docs[i].firstname;
          var lastname = docs[i].lastname;
          var image = docs[i].image;
        }

        res.render('pages/adminsearch', { purchase: purchase, full: full, name: name, firstname: firstname, lastname: lastname, image: image, id: id })
      })

    })
  })
}



exports.postSignUp = async (req, res) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = md5(req.body.password);
  var password1 = md5(req.body.password1);

  const { image } = req.files;
  image.mv(path.resolve(__dirname, '../public/posts/', image.name));
  try {
    //listing messages in users mailbox 
    let signup = await new Admin({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      password: password1,
      image: `/posts/${image.name}`
    })
    signup.save();
    req.flash('server-success', "You have successfully created an account proceed to signin")
    res.render('pages/signupandsignin', { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') });
  }
  catch (err) {
    next(err);
  }

}


exports.logAdmin = (req, res) => {
  req.session.username = req.body.username;
  var username = req.session.username;
  req.session.password = req.body.password;
  var password = (req.body.password);
  var username1 = req.body.username;
  Admin.findOne({ username: username }, function (err, founduser, foundname) {
    if (!founduser) {
      console.log("incorrect credentials")
      var warning = "incorrect credentials";
      req.flash('server-error', "incorrect credentials entered")
      return res.render("pages/adminlogin", { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') })

    }
    if (founduser.password != password) {
      console.log("incorrect credentials")
      req.flash('server-error', "incorrect credentials")
      res.render("pages/adminlogin", { serverSucess: req.flash('server-success'), serverError: req.flash('server-error') })
    }

    if (founduser.password === password || founduser.role === "Admin") {
      res.cookie("role","admin",{
        maxAge: 5000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
      // console.log(founduser.age)
      var firstname = founduser.firstname;
      var lastname = founduser.lastname;
      var id = founduser.id;
      // return res.render("user",{firstname:firstname,lastname:lastname,id:id})
      res.redirect(url.format({
        pathname: "/adminhome",
        // query: {
        //   firstname: firstname,
        //   lastname: lastname
        // }
      }));
    }
  })
}
exports.adminHome = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  username = req.session.username;
  Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
    for (i = 0; i < docs.length; i++) {
      var id = docs[i].id;
      var firstname = docs[i].firstname;
      var lastname = docs[i].lastname;
      var image = docs[i].image;
    }
    res.render("pages/adminhome", { username: username, id: id, firstname: firstname, lastname: lastname, image: image });
  })
}