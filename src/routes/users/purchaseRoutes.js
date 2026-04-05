import express from "express";
import {purchaseCart} from "../../controller/purchaseController.js";

const router = express.Router();

router.post("/purchase", purchaseCart);

export default router;