const nodemailer = require("nodemailer");
const emailTemplates = require("./emailTemplate");

const sendEmail = async (email, templateType, customData = {}) => {
  try {
    console.log(
      "email, templateType, customData:",
      email,
      templateType,
      customData
    );

    const template = emailTemplates[templateType];
    if (!template) {
      throw new Error(`No email template found for type: ${templateType}`);
    }

    let { subject, html } = template;

    Object.keys(customData).forEach((key) => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), customData[key]);
      subject = subject.replace(new RegExp(`{{${key}}}`, "g"), customData[key]);
    })

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS_DRAFT,
        pass: process.env.EMAIL_PASSWORD_DRAFT,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Draft Maker" <${process.env.EMAIL_ADDRESS_DRAFT}>`,
      to: email,
      subject: subject,
      html: html,
    };

    console.log("Mail options:", mailOptions);

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

module.exports = sendEmail;
