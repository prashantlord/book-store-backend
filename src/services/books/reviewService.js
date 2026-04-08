import Book from "../../models/bookModel.js";
import {errorResponse, successResponse} from "../../utils/responseHelper.js";
import {validateId} from "../../utils/helperFunctions.js";

// 🔹 Common helpers
const getBook = async (bookId) => {
    validateId(bookId, 404, "Book id is invalid");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    return book;
};

const getReview = (book, reviewId) => {
    validateId(reviewId, 404, "Review id is invalid");

    const review = book.reviews.id(reviewId);
    if (!review) errorResponse(404, "Review not found");

    return review;
};

const checkOwnership = (review, userId) => {
    if (review.user.toString() !== userId.toString()) {
        errorResponse(401, "Unauthorized");
    }
};

// 🔹 Services
export const createReviewService = async (bookId, userId, rating, comment) => {
    const book = await getBook(bookId);

    const alreadyReviewed = book.reviews.some(
        (r) => r.user.toString() === userId
    );

    if (alreadyReviewed) {
        errorResponse(409, "Review already exists");
    }

    book.reviews.push({
        user: userId,
        rating,
        comment: comment ?? "",
    });

    await book.save();

    return successResponse(201, "Review successfully created", book);
};

export const updateReviewService = async (
    bookId,
    reviewId,
    userId,
    rating,
    comment
) => {
    const book = await getBook(bookId);
    const review = getReview(book, reviewId);

    checkOwnership(review, userId);

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await book.save();

    return successResponse(200, "Review updated successfully", book);
};

export const deleteReviewService = async (bookId, reviewId, userId) => {
    const book = await getBook(bookId);
    const review = getReview(book, reviewId);

    checkOwnership(review, userId);

    review.deleteOne();
    await book.save();

    return successResponse(200, "Review deleted successfully", book);
};