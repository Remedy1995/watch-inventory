const Purchase = require('../models/purchases');
const Register = require('../models/registermodel');
const TotalAmount = require('../models/totalamount');
const Admin = require('../models/adminmodel');
//view user purchases
exports.viewUserPurchases = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  Purchase.find({}, function (err, purchase) {
    username = req.session.username;
    Register.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
      for (i = 0; i < docs.length; i++) {
        var id = docs[i].id;
        var firstname = docs[i].firstname;
        var lastname = docs[i].lastname;
        var image = docs[i].image;
      }
      res.render('pages/userviewpurchases', { purchase: purchase, firstname: firstname, lastname: lastname, image: image, id: id });
    })
  })
}
//view user purchases made
exports.postviewUserPurchases = (req, res) => {
  var search = req.body.search;
  Purchase.find({ 'customername': new RegExp(search, 'i') }, function (err, purchase) {
    TotalAmount.find({ 'customername': new RegExp(search, 'i') }, function (err, total) {
      for (i = 0; i < total.length; i++) {
        var full = total[i].totalamount;
        var name = total[i].customername;
      }
      username = req.session.username;
      Register.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {

        for (i = 0; i < docs.length; i++) {
          var id = docs[i].id;
          var firstname = docs[i].firstname;
          var lastname = docs[i].lastname;
          var image = docs[i].image;
        }
        res.render('pages/userviewpurchases', { purchase: purchase, full: full, name: name, firstname: firstname, lastname: lastname, image: image, id: id })
      })
    })
  })
}

exports.postPurchases = (req, res) => {
  var search = req.body.search;
  Purchase.find({ 'customername': new RegExp(search, 'i') }, function (err, purchase) {
    TotalAmount.find({ 'customername': new RegExp(search, 'i') }, function (err, total) {
      for (i = 0; i < total.length; i++) {
        var full = total[i].totalamount;
        var name = total[i].customername;
      }
      username = req.session.username;
      Register.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
        for (i = 0; i < docs.length; i++) {
          var id = docs[i].id;
          var firstname = docs[i].firstname;
          var lastname = docs[i].lastname;
          var image = docs[i].image;
        }
        res.render('pages/purchasesearch', { purchase: purchase, full: full, name: name, firstname: firstname, lastname: lastname, image: image, id: id })
      })
    })
  })
}

exports.getPurchases = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  Purchase.find({}, function (err, purchase, purchase1) {
    username = req.session.username;
    Admin.find({ 'username': new RegExp(username, 'i') }, function (err, docs) {
      console.log(docs)
      for (i = 0; i < docs.length; i++) {
        var id = docs[i].id;
        var firstname = docs[i].firstname;
        var lastname = docs[i].lastname;
        var image = docs[i].image;
      }
      res.render('pages/purchases', { purchase: purchase, firstname: firstname, lastname: lastname, image: image, id: id });
    })
  })

}


exports.getviewPurchases = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  res.redirect("/viewpuchases");
}

exports.deletePurchases = (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0',
})
  console.log(req.params.id);
  Purchase.findById(req.params.id, function (err, information) {
    var customer_name = information.customername;
    Purchase.findByIdAndDelete(req.params.id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
      var amountdelete = 0;
      var query = { customername: customer_name };
      var data = { totalamount: amountdelete }
      TotalAmount.updateOne(query, data, (err, collection) => {
        if (err) throw err;
        console.log("Record updated successfully");
        console.log(collection);
      })
    })
    res.redirect("/purchases");
  })
}