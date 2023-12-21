"use strict";
import nodemailer from "nodemailer";

const sendMail = async (
  to,
  subject,
  text,
  html,
  filePath = null,
  bcc = null
) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: to,
    subject,
    text,
    html,
    attachments: filePath
      ? {
          path: filePath,
        }
      : [],
    bcc,
  });
};

export default sendMail;
