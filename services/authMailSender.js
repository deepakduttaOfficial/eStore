import transporter from "../config/mail.config.js";
import envConfig from "../config/env.config.js";
import CustomError from "./errorHandler.js";

const authMailSender = async (options, req) => {
  try {
    const message = {
      from: envConfig.MAIL_EMAIL,
      to: options.email,
      subject: "Plz verify the email ✔",
      html: `<h1> ${options.name} ! Thanks for registration our site </h1>
        <h4> please varify your mail to continue... </h4>
        <a href="http://${req.headers.host}/api/v1/user/verify-email/${options.verifyToken}">Varify Your Account</a>`,
    };

    await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
    throw new CustomError("Verification mail send failed. Resend it.");
  }
};

export default authMailSender;
