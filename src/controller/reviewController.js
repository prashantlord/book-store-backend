import {createReviewService, deleteReviewService, updateReviewService} from "../services/books/reviewService.js";

export const createBookReview = async (req, res) => {
    try {
        const book = await createReviewService(req, res);
        res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message});
    }
}

export const updateBookReview = async (req, res) => {
    try {
        const book = await updateReviewService(req, res);
        res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message});
    }
}

export const deleteBookReview = async (req, res) => {
    try {
        const book = await deleteReviewService(req, res);
        res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message});
    }
}