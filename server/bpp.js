const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'my.email@gmail.com',
            clientId: '41535199378-8s6045um3imcbupcklq0gfkuachd2i3v.apps.googleusercontent.com',
            clientSecret: 'i1st0nuaUUue30J7EJDrAXNF',
            refreshToken: 'X/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        })
    }
})

var mailOptions = {
    from: 'My Name <my.email@gmail.com>',
    to: 'receiver.email@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error');
    } else {
        console.log('Email Sent');
    }
})