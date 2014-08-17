
modules.exports = {
  createAddress: function(number, carrier){

    var emailAddress,
        carrierSuffix;

    switch(carrier){
      case "Verizon":
        carrierSuffix = "@vtext.com";
        break;
      case "AT&T":
        carrierSuffix = "@mobile.att.net";
        break;
      case "T-Mobile":
        carrierSuffix = "@tmomail.net";
        break;
    }

    emailAddress = number.toString() + carrierSuffix;
  }

//   sendEmail: function(email, msg, interval,attachment){
//     if(attachment === "undefined"){
//       attachment = "";
//     };
//   }
// }