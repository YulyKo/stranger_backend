const db_properties = require('./db_properties');
const nodemailer = require('nodemailer');

const post = (res, req) => {
    let data = req.body;
    console.log(data);
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        port: 465,
        auth: {
            user: 'juliakotenko.forstudy@gmail.com',
            pass: '1!qwerty!1'
        }
    })
    let message = {
        headers: {
            'disableFileAccess ': 'false'
        },
        from: "juliakotenko.forstudy@gmail.com",
        to: "nohikut@gmail.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>"
      };

    smtpTransport.sendMail(message,
        (error, response) => {
            if (error) {
                console.log('sented');
                res.status(400).send(error)
            } else { res.send('Success') }
            smtpTransport.close();
    })
}

module.exports = {
    post
}