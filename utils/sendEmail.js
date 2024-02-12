import nodemailer from "nodemailer";
import MailGen from "mailgen";
import fs from "fs";
const sendEmail = async (subject, send_to, template, reply_to, cc) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  // Create Template With MailGen
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      name: "Darajo Tech",
      link: "http://localhost:3000/",
    },
  });
  const emailTemplate = mailGenerator.generate(template);
  fs.writeFileSync("preview.html", emailTemplate, "utf8");

  // Options f0r sending email
  const options = {
    from: process.env.EMAIL_USER,
    to: send_to,
    replyTo: reply_to,
    subject,
    html: emailTemplate,
    cc,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;
