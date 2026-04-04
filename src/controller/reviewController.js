import {createReviewService} from "../services/books/reviewService.js";

export const createBookReview = async (req, res) => {
    try {
        const books = await createReviewService(req, res);
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err});
    }
}

export const updateBookReview = async (req, res) => {
}

export const deleteBookReview = async (req, res) => {
}