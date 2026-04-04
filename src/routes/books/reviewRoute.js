import express from "express";
import {createBookReview, deleteBookReview, updateBookReview} from "../../controller/reviewController.js";

const router = express.Router();

router.post("/:bookId", createBookReview);
router.put("/:bookId", updateBookReview);
router.delete("/:reviewId", deleteBookReview);

export default router;

