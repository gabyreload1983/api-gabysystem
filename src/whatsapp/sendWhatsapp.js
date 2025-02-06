import axios from "axios";
import {
  formatPrice,
  getFinishOrderTemplate,
  getTotalOrder,
} from "../utils.js";

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

export const getDataMessageTemplate = (recipient, templateName, components) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: "es_AR",
      },
      components: components,
    },
  });
};

export const getComponentWithLink = (text, link) => [
  {
    type: "header",
    parameters: [
      {
        type: "document",
        document: {
          link: link,
          filename: text,
        },
      },
    ],
  },
  {
    type: "body",
    parameters: [
      {
        type: "text",
        text: text,
      },
    ],
  },
];

export const getComponentTemplate = (...texts) => [
  {
    type: "body",
    parameters: texts.map((text) => ({
      type: "text",
      text,
    })),
  },
];

export const sendWhatsappPdfOrder = async ({ nrocompro, recipient }) => {
  const link = `https://sinapsis.com.ar/resources/serviceworks/${nrocompro}.pdf`;
  const component = getComponentWithLink(nrocompro, link);
  const data = getDataMessageTemplate(recipient, "enviar_orden", component);
  return await sendWhatsapp(data);
};

export const sendWhatsappTakeOrder = async ({ order, recipient }) => {
  const component = getComponentTemplate(order.nrocompro);
  const data = getDataMessageTemplate(recipient, "orden_tomada", component);
  return await sendWhatsapp(data);
};

export const sendWhatsappFinishOrder = async ({ order, recipient }) => {
  const totalOrderWithTax = formatPrice(getTotalOrder(order));
  const component = getComponentTemplate(order.nrocompro, totalOrderWithTax);
  const template = getFinishOrderTemplate(order.diag);
  const data = getDataMessageTemplate(recipient, template, component);
  return await sendWhatsapp(data);
};
