import { Router } from "express";
import * as alexisAccountController from "../controllers/alexisAccount.controller.js";
import * as salesCommissionsController from "../controllers/salesCommissions.controller.js";
import { authorization } from "../utils.js";
import { getTextMessageInput, sendWhatsapp } from "../whatsapp/sendWhatsapp.js";

const router = Router();

// ACCOUNT ROUTE
router.get(
  "/account",
  authorization("premium"),
  alexisAccountController.getAll
);

router.get(
  "/account/:id",
  authorization("premium"),
  alexisAccountController.findById
);

router.delete(
  "/account/:id",
  authorization("premium"),
  alexisAccountController.remove
);

//  PAYMENT

router.post(
  "/payment",
  authorization("premium"),
  alexisAccountController.create
);

// SALES ROUTE

router.get(
  "/sales",
  authorization("premium"),
  salesCommissionsController.getSales
);
router.get(
  "/sales/:id",
  authorization("premium"),
  salesCommissionsController.getSale
);

router.post(
  "/sales/refresh",
  authorization("premium"),
  salesCommissionsController.refresh
);

router.patch(
  "/sales",
  authorization("premium"),
  salesCommissionsController.updateSale
);

router.post("/send", async (req, res) => {
  console.log(req.body);

  const { nrocompro } = req.body;

  const components = [
    {
      type: "body",
      parameters: [
        {
          type: "text",
          text: nrocompro,
        },
      ],
    },
  ];
  const data = getTextMessageInput(
    process.env.RECIPIENT_WAID,
    "orden_ingreso",
    "es_AR",
    components
  );
  console.log("data", data);

  const response = await sendWhatsapp(data);

  return res.sendStatus(200);
});

export default router;
