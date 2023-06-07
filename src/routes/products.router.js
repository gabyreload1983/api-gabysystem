import { Router } from "express";
import { searchBy } from "../controllers/products.controller.js";

const router = Router();

router.get("/search-by", searchBy);

export default router;
