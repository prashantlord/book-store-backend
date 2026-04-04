import express from "express";
import authRoute from "./auth/authRoute.js";
import bookRoute from "./books/bookRoute.js";
import reviewRoute from "./books/reviewRoute.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.use("/", authRoute);
router.use('/books', bookRoute);
router.use('/books/reviews', authenticateUser, reviewRoute);

export default router;
