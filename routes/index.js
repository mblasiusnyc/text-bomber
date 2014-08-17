var express = require('express');
var router = express.Router();
var models = require('../models');
var email = require('../email');


//--------SUBMIT BUTTON ACTION--------------
router.post('/submit', function(req, res){
  var title = req.body.title;
  var tel = req.body.phone_number;
  var carrier = req.body.carrier;
  var photo = req.body.photo;
  var msg = req.body.message;
  var interval = req.body.interval;

//generates the full email address which texts will be sent to
//HOW DO I EXPORT THESE FUNCTIONS TO ANOTHER MODULE?
  var generateEmail = function(number, carrier){
    switch(carrier){
      case "Verizon":
        return number.toString() + "@vtext.com";
      case "AT&T":
        return number.toString() + "@mobile.att.net";
      case "T-Mobile":
        return number.toString() + "@tmomail.net";
    }
  };

//save request in database
  var r = new models.UserRequest({ "title": title, "phone_number": tel, "carrier": carrier, "message": msg, "interval": "10 seconds", "mailOptions.to": generateEmail(tel, carrier), "mailOptions.subject": msg, "mailOptions.html": '<b>'+msg+'</b>'});
  r.save();

  console.log("Tel is: " + tel);
  console.log("Carrier is: " + carrier);
  console.log("Photo is: " + photo);
  console.log("Message is: " + msg);

//SENDS AN INITIAL EMAIL
  var sendEmail = email.transporter.sendMail(r.mailOptions, function(error, info){
    if(error){
      console.log("An error occurred in sending the initial email: " + error);
    } else {
      console.log("Message has been sent: " + info.response);
    }
  });

setInterval(sendEmail, 10000);

  res.redirect('/');
});

//--------INITIAL PAGE REQUESTS--------------
router.get('/', function(req, res){
  models.UserRequest.find({}, function(err, requests){
    res.render('index', { requests: requests});
    console.log('node is running');
  });
});



module.exports = router;
