var nodemailer = require('nodemailer');

module.exports = {
// create reusable transporter object using SMTP transport
  transporter: nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'text.bomber2014@gmail.com',
        pass: 'TextBomber1'
    }
  })
}


//USE LATER TO SEND EMAIL

// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Message sent: ' + info.response);
//     }
// });