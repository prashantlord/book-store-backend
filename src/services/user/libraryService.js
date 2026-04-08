import User from "../../models/userModel.js";
import Book from "../../models/bookModel.js";
import {errorResponse, successResponse} from "../../utils/responseHelper.js";
import {validateId} from "../../utils/helperFunctions.js";


const getBook = async (bookId) => {
    validateId(bookId, "Invalid book ID");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    return book;
};

const getUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) errorResponse(404, "User not found");

    return user;
};

const findIndex = (arr, bookId) =>
    arr.findIndex((item) => item.toString() === bookId.toString());

const toggleItem = (arr, bookId) => {
    const index = findIndex(arr, bookId);

    if (index !== -1) {
        arr.splice(index, 1);
        return "removed";
    } else {
        arr.push(bookId);
        return "added";
    }
};

// 🔹 Services
export const toggleWishlistService = async (bookId, userId) => {
    await getBook(bookId);
    const user = await getUser(userId);

    toggleItem(user.wishlist, bookId);

    await user.save();
    return successResponse(200, "Wishlist updated successfully", user);
};

export const toggleFavoriteService = async (bookId, userId) => {
    await getBook(bookId);
    const user = await getUser(userId);

    toggleItem(user.favorites, bookId);

    await user.save();
    return successResponse(200, "Favorites updated successfully", user);
};

export const addToCartService = async (bookId, userId) => {
    await getBook(bookId);
    const user = await getUser(userId);

    const exists = findIndex(user.cart, bookId) !== -1;
    if (exists) {
        throw errorResponse(400, "Item already in cart");
    }

    user.cart.push(bookId);

    await user.save();
    return successResponse(200, "Item added to cart", user);
};

export const removeFromCartService = async (bookId, userId) => {
    await getBook(bookId);
    const user = await getUser(userId);

    const index = findIndex(user.cart, bookId);
    if (index === -1) {
        throw errorResponse(400, "Item doesn't exist in cart");
    }

    user.cart.splice(index, 1);

    await user.save();
    return successResponse(200, "Item removed from cart", user);
};