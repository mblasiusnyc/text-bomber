var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/text_bomber'); //connects us to mongodb
var db = mongoose.connection;  //defines an object that has properties of our mongodb connection
db.on('error', console.error.bind(console, 'mongodb connection error'));  //defines error response

var nodeMailer = require('nodemailer');
var email = require('../email.js');

var UserRequest, User;
var Schema = mongoose.Schema;

var userRequestSchema = new Schema({
  title: String,
  url_name: String,
  phone_number:  Number,
  carrier: String,
  email_address: String,
  owner_id: String,
  message: String,
  interval: String,
  date: { type: Date, default: Date.now },
  status: Number,

  //fields used for Node Mailer
  mailOptions: {
    from: { type:String, default: "text-bomber-app" }, // sender address
    to: String, // list of receivers
    subject: {
      type:String,
      default: "You have been text-bombed. You will recieve texts until the sender decides to stop sending you messages." }, // Message sent with every text
    text: String, // plaintext body
    html: String // html body
  }
});

//Sets the url name - Moved from within index.js
  userRequestSchema.pre('save', function(next){
      var generateUrlName = function(title){
        if(typeof title != "undefined" && title !== ""){
          return title.replace(/[^0-9A-z]+/g, "_");
        } else {
          return Math.random().toString(36).substring(2,7);
        }
      };
    this.url_name = generateUrlName(this.title);
    next();
  })

//Not being used right now...
var userSchema = new Schema({
  name:  {
      first: String,
      last: String
    },
  email: String
});

UserRequest = mongoose.model('UserRequest', userRequestSchema);
User = mongoose.model('User', userSchema);

module.exports = {"UserRequest": UserRequest, "User": User};