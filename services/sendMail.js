import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const sendMail = async option => {
  // transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER_NAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //   mail options
  const mailOptions = {
    from: 'mohan',
    to: option.to,
    subject: option.subject,
    text: option.text
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log(res.response);
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;
