import Book from "../../models/bookModel.js";
import {errorResponse, successResponse} from "../../utils/responseHelper.js"; // adjust path as needed
import {generateJwtToken, validateId} from "../../utils/helperFunctions.js";

// Utility: Build category filter query
const buildCategoryQuery = (categoryParam) => {
    if (!categoryParam) return {};
    const categories = Array.isArray(categoryParam) ? categoryParam : [categoryParam];
    return {
        $or: categories.map(cat => {
            const normalizedCat = cat.replace(/[-\s]/g, '').toLowerCase();
            return {
                categories: {
                    $elemMatch: {
                        $regex: normalizedCat.split('').join('.*'), $options: 'i'
                    }
                }
            };
        })
    };
};

// Utility: Calculate ratings for a book
const calculateRatings = (book) => {
    const ratingsCount = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    book.reviews.forEach(r => {
        if (r.rating >= 1 && r.rating <= 5) ratingsCount[r.rating]++;
    });
    const totalRatings = Object.values(ratingsCount).reduce((a, b) => a + b, 0);
    const sumRatings = Object.entries(ratingsCount)
        .reduce((sum, [key, val]) => sum + Number(key) * val, 0);
    const avgRating = totalRatings ? sumRatings / totalRatings : 0;
    return {avgRating, ratingsCount};
};

// Utility: Pick best choice
const getBestChoice = (booksWithRatings) => {
    const maxAvgRating = Math.max(...booksWithRatings.map(b => b.rating.avgRating));
    const topBooks = booksWithRatings.filter(b => b.rating.avgRating === maxAvgRating);
    return topBooks[Math.floor(Math.random() * topBooks.length)];
};

// Main service
export const getBooksService = async (category) => {
    const query = buildCategoryQuery(category);
    const books = await Book.find(query)
        .populate('author', 'username email avatar_url');

    if (!books || books.length === 0) {
        return successResponse(200, "No books found", {books: [], bestChoice: null});
    }

    const booksWithRatings = books.map(book => {
        const bookObj = book.toObject();
        const sortedReviews = bookObj.reviews
            ? [...bookObj.reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            : [];
        return {
            ...bookObj,
            rating: calculateRatings(book),
            reviews: sortedReviews
        };
    });

    const bestChoice = getBestChoice(booksWithRatings);

    return successResponse(200, "Books fetched successfully", {books: booksWithRatings, bestChoice});
};

export const getSingleBookService = async (bookId) => {
    validateId(bookId, "Invalid Book Id");

    const book = await Book.findById(bookId)
        .populate('author', 'username email avatar_url')
        .lean();

    if (!book) errorResponse(404, "No book found");

    if (book.reviews) {
        book.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return successResponse(200, "Book fetched successfully", {book});
};