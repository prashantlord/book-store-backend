import express from "express";
import {getPublicBooks, getSingleBook} from "../../controller/bookController.js";

const router = express.Router();

router.get("/", getPublicBooks);
router.get("/:bookId", getSingleBook)

export default router;