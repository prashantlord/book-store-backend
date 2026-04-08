import {createReviewService, deleteReviewService, updateReviewService} from "../services/books/reviewService.js";

export const createBookReview = async (req, res) => {
    const bookId = req.params.bookId;
    const {rating, comment} = req.body;
    const userId = req.user.user._id;

    const data = await createReviewService(bookId, userId, rating, comment);
    return res.status(data.statusCode).json(data);
}

export const updateBookReview = async (req, res) => {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    const userId = req.user.user._id;
    const {rating, comment} = req.body;

    const data = await updateReviewService(bookId, reviewId, userId, rating, comment);
    return res.status(200).json(data);
}

export const deleteBookReview = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.user._id;
    const reviewId = req.params.reviewId;

    const data = await deleteReviewService(bookId, reviewId, userId);
    return res.status(200).json(data);
}