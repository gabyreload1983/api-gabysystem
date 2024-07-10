import Client from "ftp";
import logger from "../logger/logger.js";

// sinapsis
const config = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
};

const remotePath = "/public_html/resources/serviceworks";

export const sendPdfToSinapsisWeb = ({ path, nrocompro }) => {
  const c = new Client();
  c.on("ready", function () {
    c.put(path, `${remotePath}/${nrocompro}.pdf`, (err) => {
      if (err) {
        c.end();
        logger.error("ERROR", err);
        return false;
      }
    });
    c.end();
    logger.info("PDF Upload successfully!");
    return true;
  });
  c.connect(config);
};
