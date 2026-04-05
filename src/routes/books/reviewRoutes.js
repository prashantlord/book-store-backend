import express from "express";
import {createBookReview, deleteBookReview, updateBookReview} from "../../controller/reviewController.js";
import {validate} from "../../middleware/validate.js";
import {reviewSchema} from "../../schema/book.schema.js";

const router = express.Router({mergeParams: true});

router.post("/", validate(reviewSchema), createBookReview);
router.route("/:reviewId")
    .put(validate(reviewSchema), updateBookReview)
    .delete(deleteBookReview);

export default router;

