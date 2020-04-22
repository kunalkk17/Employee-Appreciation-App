var nodemailer = require('nodemailer');
const creds = require('../config/emailconfig');

var transport = {
    host : 'smtp.gmail.com',
    auth : {
        user: creds.User,
        pass: creds.Password
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error,success)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Server is ready to take messages")
    }
})

module.exports = function sendMail(mail){
    let errors = {};
    console.log("inside sendMail");
    (transporter.sendMail(mail,(err,data)=>{
        console.log("inside transporter.sendMail")
        if(err){
            errors.msg.json(err);
        }
        else{
            console.log("message sent")
        }
        return {
            errors,
            isValid: isEmpty(errors)
          };
    })
    );
}
