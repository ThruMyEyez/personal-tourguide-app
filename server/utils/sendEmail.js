const nodemailer = require('nodemailer');

const sendEmail = (email, subject, content) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: Number(process.env.SMPT_PORT),
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS
    }
  });

  transporter
    .sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: content
    })
    .then((mail) => {
      console.log('email sent successfully: ' + mail);
    })
    .catch((error) => {
      console.log('email not sent to: ' + email);
      console.log(error);
      return error;
    });
};

module.exports = { sendEmail };
