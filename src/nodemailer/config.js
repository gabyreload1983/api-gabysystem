"use strict";
import nodemailer from "nodemailer";

const sendMail = async (
  to,
  subject,
  text,
  html,
  arrayPath = null,
  bcc = null,
  fromEmail = "noReplay"
) => {
  let host = process.env.MAIL_HOST;
  let user = process.env.MAIL_USER;
  let pass = process.env.MAIL_PASSWORD;
  let from = process.env.MAIL_FROM;

  if (fromEmail === "comprobantes") {
    user = process.env.MAIL_USER_COMPROBANTES;
    pass = process.env.MAIL_PASSWORD_COMPROBANTES;
    from = process.env.MAIL_FROM_COMPROBANTES;
  }
  let transporter = nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  return transporter.sendMail({
    from,
    to: to,
    subject,
    text,
    html,
    attachments: arrayPath ? [...arrayPath] : [],
    bcc,
  });
};

export default sendMail;
