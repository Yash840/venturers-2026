const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (toEmail, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Club Events" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Registration Confirmed!',
    html: `
      <h2>Hey ${name}! 🎉</h2>
      <p>You have successfully registered for our upcoming event.</p>
      <p>We'll keep you updated with more details soon.</p>
      <br/>
      <p>See you there!</p>
      <p><strong>The Club Team</strong></p>
    `,
  });
};

module.exports = sendConfirmationEmail;
