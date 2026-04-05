import Book from "../../models/bookModel.js";

export const createReviewService = async (req, res) => {
    const {rating, comment} = req.body;
    try {
        const bookId = req.params.bookId;

        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        const review = book.reviews.find((review) => review.user.toString() === req.user.id);
        if (review) {
            throw new Error("Review already exists");
        }

        book.reviews.push({
            user: req.user.id, rating, comment: comment ?? ""
        });

        return await book.save();
    } catch (err) {
        throw err;
    }
}

export const updateReviewService = async (req, res) => {
    const {rating, comment} = req.body;
    const {bookId, reviewId} = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error("Book not found");
    }

    const review = book.reviews.id(reviewId);
    if (!review) {
        throw new Error("Review not found");
    }

    if (String(userId) !== String(review.user)) {
        throw new Error("Unauthorized");
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    // Save parent document
    return await book.save();
}

export const deleteReviewService = async (req, res) => {
    const {bookId, reviewId} = req.params;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
        throw new Error("Book not found");
    }

    const review = book.reviews.find(r => String(r._id) === reviewId);
    if (!review) {
        throw new Error("Review not found");
    }

    if (String(userId) !== String(review.user)) {
        throw new Error("Unauthorized");
    }

    book.reviews = book.reviews.filter(r => String(r._id) !== reviewId);

    return await book.save();
}