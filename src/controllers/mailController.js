// server/src/controllers/mailController.js
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import Email from "../models/emailModel.js"; // Import the model

export const validateMail = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("subject").trim().escape(),
  body("message").trim().escape(),
];

export const submitForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, subject, message } = req.body;
  console.log("message received: ", subject);

  const newEmail = new Email({
    email,
    subject,
    message,
  });

  try {
    await newEmail.save();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_EMAIL,
        pass: process.env.BREVO_SMTP_API,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: subject,
      text: `You received a message from ${email} : ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to send email");
  }
};
