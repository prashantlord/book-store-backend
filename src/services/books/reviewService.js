import Book from "../../models/bookModel.js";
import {errorResponse, successResponse} from "../responseService.js";
import {validateId} from "../validationSerivce.js";

export const createReviewService = async (bookId, userId, rating, comment) => {
    if (validateId(bookId)) errorResponse(404, "Invlid Book Id");

    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");

    const alreadyReviewed = book.reviews.some(r => r.user.toString() === userId);

    if (alreadyReviewed) {
        errorResponse(409, "Review Already Exists");
    }

    book.reviews.push({
        user: userId, rating, comment: comment ?? ""
    });

    await book.save();
    return successResponse(201, "Review Successfully created", book);
};

export const updateReviewService = async (bookId, reviewId, userId, rating, comment) => {
    if (validateId(bookId)) errorResponse(404, "Invlid Book Id");
    if (validateId(reviewId)) errorResponse(404, "Invlid Rating Id");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    const review = book.reviews.id(reviewId);
    if (!review) errorResponse(404, "Review not found");

    if (review.user.toString() !== userId) {
        errorResponse(401, "Unauthorized");
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await book.save();
    return successResponse(200, "Review Updated Successfully", book);
};

export const deleteReviewService = async (bookId, reviewId, userId) => {
    if (validateId(bookId)) errorResponse(404, "Invlid Book Id");
    if (validateId(reviewId)) errorResponse(404, "Invlid Review Id");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    const review = book.reviews.id(reviewId);
    if (!review) errorResponse(404, "Review not found");

    if (review.user.toString() !== userId) {
        errorResponse(401, "Unauthorized");
    }

    review.deleteOne(); // ✅ better than filter

    await book.save();
    return book;
};