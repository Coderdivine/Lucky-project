const nodemailer = require("nodemailer");
const CustomError = require("./custom-error");
const EMAIL = require("../config/email.json");
const CONTACT = require("../config/contact.json");
const { generateEmail } = require("./global.email");
require("dotenv");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_PASS_EMAIL,
    pass: process.env.AUTH_PASS_KEY, // Assuming AUTH_KEY is the password for the email
  },
});

async function sendMail({ email, otp }) {
  const mailOptions = {
    from: process.env.AUTH_PASS_EMAIL,
    to: email,
    subject: "OTP link",
    html: `
      <div>
        <div id="header" style="text-align:center;background:#000;color:#fff;
        padding:5px 12px;border-radius:5px;font-style:sans-serif;">
          <h1>DABINX</h1>
        </div>
        <section id="body" style="margin:0;padding:0;box-sizing:border-box;
        background:whitesmoke;border-radius:6px;padding:6px 18px;font-style:sans-serif;">
        <small style="font-style: sans-serif;">
        Hello there. Your 
        <span>One Time Pass Code (OTP)</span> ${otp} is ready for use. 
        <b>Ensure you do not share this code with any third party.</b>
        </small>
        </section>
      </div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { };
  } catch (error) {
    throw new CustomError(error.message);
  }
}

async function sendForgotPasswordMail({ otp, email }) {
  const mailOptions = {
    from: process.env.AUTH_PASS_EMAIL,
    to: email,
    subject: "Password Reset Code",
    html: `
      <div>
        <div id="header" style="text-align:center;background:#000;color:#fff;
        padding:5px 12px;border-radius:5px;font-style:sans-serif;">
          <h1>DABINX.</h1>
        </div>
        <section id="body" style="margin:0;padding:0;box-sizing:border-box;
        background:whitesmoke;border-radius:6px;padding:6px 18px;font-style:sans-serif;">
          <small style="font-style:sans-serif;">Password reset code 
          <span>One Time Pass Code (OTP)</span> ---> ${otp}. 
          <b>Do not share this code with a third party. </b></small>
        </section>
      </div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { email, otp };
  } catch (error) {
    throw new CustomError(error.message);
  }
}

async function sendGeneralMail(email, emailName, templateName, data) {

  const data_ = {
    ...data,
    header: EMAIL[emailName].header,
    content: EMAIL[emailName].content,
    emailContactEmail: data.emailContactEmail || CONTACT["email"],
    emailContactPhone: data.emailContactPhone || CONTACT["phone"],
    emailContactAddress: data.emailContactAddress || CONTACT["address"],
  };
  console.log({ data_ })
  if (!data_) throw new CustomError("Unable to generate email template.", 500);
  const mailOptions = {
    from: process.env.AUTH_PASS_EMAIL,
    to: email,
    subject: EMAIL[emailName].header,
    html: await generateEmail(templateName, data_),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return {};
  } catch (error) {
    throw new CustomError(error.message);
  }
}




module.exports = { sendMail, sendForgotPasswordMail, sendGeneralMail };
