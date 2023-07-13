"use strict";
import nodemailer from "nodemailer";
import config from "../config/config.js";

const sendMail = async (
  to,
  subject,
  text,
  html,
  filePath = null,
  bcc = null
) => {
  let transporter = nodemailer.createTransport({
    host: config.mail_host,
    port: 465,
    secure: true,
    auth: {
      user: config.mail_user,
      pass: config.mail_password,
    },
  });

  return transporter.sendMail({
    from: config.mail_from,
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
