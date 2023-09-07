import { Router } from "express";
import { searchBy, searchBySerie } from "../controllers/products.controller.js";

const router = Router();

router.get("/search-by", searchBy);

router.get("/serie/:serialNumber", searchBySerie);

export default router;
