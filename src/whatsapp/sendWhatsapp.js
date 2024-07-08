import axios from "axios";

export const sendWhatsapp = (data) => {
  const config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const getTextMessageInput = (
  recipient,
  templateName,
  languageCode,
  components
) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode,
      },
      components: components,
    },
  });
};

export async function sendPdfToWhatsapp(pdfBase64, recipientNumber) {
  const data = {
    messaging_product: "whatsapp",
    to: recipientNumber,
    type: "document",
    document: {
      filename: "document.pdf",
      document: pdfBase64,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${whatsappToken}`,
    },
  };

  try {
    const response = await axios.post(
      "https://graph.facebook.com/v13.0/your_whatsapp_business_account/messages",
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
