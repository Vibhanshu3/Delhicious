const nodemailer = require("nodemailer")
const MAILTRAP_USERNAME = process.env.MAILTRAP_USERNAME;
const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD;

module.exports = async function (options) {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: MAILTRAP_USERNAME,
          pass: MAILTRAP_PASSWORD
        }
      });

      await transport.sendMail (options);
}


//gmail > seq > 2sauth >app pass