var nodemailer = require('nodemailer');
let account = nodemailer.createTestAccount();
console.log(account);
let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'schoudhari@techracers.io',
    pass: password
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"Shreyas" <schoudhari@techracers.io',
  to: 'shreyas@mailinator.com',
  subject: 'dd',
  text: 'dd'
};

transporter.sendMail(HelperOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("The message was sent!");
  console.log(info);
});
