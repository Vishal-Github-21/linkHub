// testMail.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// console.log(process.env.EMAIL_USER)
// console.log(process.env.EMAIL_PASSWORD)

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER, // Access email username from environment variable
    pass: process.env.EMAIL_PASSWORD, // Access email password from environment variable
  },
});


async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Test Mail" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "✅ Nodemailer Test Successful",
      text: "If you received this, your setup is working fine!",
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

testEmail();
