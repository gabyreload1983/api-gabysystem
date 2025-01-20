import { sendWhatsappOnlineSales } from "../whatsapp/sendWhatsapp.js";

export const onlineSalesNotification = async (text = "Nueva compra Web") => {
  const recipients = ["3476636658", "4576643800"];
  for (let recipient of recipients)
    await sendWhatsappOnlineSales({ recipient, text });

  return true;
};
