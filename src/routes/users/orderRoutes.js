import express from "express";
import {checkPurchase, purchaseCart} from "../../controller/orderController.js";
const router = express.Router();

router.post("/purchase", purchaseCart);
router.get('/purchase/:pidx', checkPurchase);

export default router;