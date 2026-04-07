import {createReviewService, deleteReviewService, updateReviewService} from "../services/books/reviewService.js";

export const createBookReview = async (req, res) => {
    const bookId = req.params.bookId;
    const {rating, comment} = req.body;
    const userId = req.user.id;

    try {
        const data = await createReviewService(bookId, userId, rating, comment);
        return res.status(data.statusCode).json(data);
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({err, error: err.message});
    }
}

export const updateBookReview = async (req, res) => {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const {rating, comment} = req.body;

    try {
        const data = await updateReviewService(bookId, reviewId, userId, rating, comment);
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({err, error: err.message});
    }
}

export const deleteBookReview = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    try {
        const data = await deleteReviewService(bookId, reviewId, userId);
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({err, error: err.message});
    }
}