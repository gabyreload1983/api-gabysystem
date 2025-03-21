import { Router } from "express";
import * as invoicesController from "../controllers/invoices.controller.js";

const router = Router();

router.get("/overdue", invoicesController.getOverdueInvoices);

export default router;
