import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import libraryRoutes from "./users/libraryRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import bookRoutes from "./books/bookRoutes.js";
import reviewRoutes from "./books/reviewRoutes.js";
import purchaseRoutes from "./users/orderRoutes.js";

const router = express.Router();

router.use("/", authRoutes);

router.use("/books", bookRoutes);
router.use("/books/:bookId/reviews", authenticateUser, reviewRoutes);
router.use("/library", authenticateUser, libraryRoutes);
router.use("/carts", authenticateUser, purchaseRoutes);

export default router;
