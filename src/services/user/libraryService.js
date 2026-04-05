import User from "../../models/userModel.js";
import {errorResponse, successResponse} from "../responseService.js";
import Book from "../../models/bookModel.js";
import {validateId} from "../validationSerivce.js";

export const toggleWishlistService = async (bookId, userId) => {
    validateId(bookId, "Invalid book ID")

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    const user = await User.findById(userId);
    if (!user) errorResponse(404, "User not found");

    const index = user.wishlist.findIndex((item) => item.toString() === bookId.toString());

    if (index !== -1) {
        user.wishlist.splice(index, 1);
    } else {
        user.wishlist.push(bookId);
    }

    await user.save();
    return successResponse(200, "Toggle wishlist successfully", user);
}

export const toggleFavoriteService = async (bookId, userId) => {
    validateId(bookId, "Invalid book ID");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    const user = await User.findById(userId);
    if (!user) errorResponse(404, "User not found");

    const index = user.favorites.findIndex((item) => item.toString() === bookId.toString());

    if (index !== -1) {
        user.favorites.splice(index, 1);
    } else {
        user.favorites.push(bookId);
    }

    await user.save();
    return successResponse(200, "Toggle favorite successfully.", user);
}

export const addToCartService = async (bookId, userId) => {
    validateId(bookId, "Invalid book ID");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    const user = await User.findById(userId);
    if (!user) errorResponse(404, "User not found");

    const index = user.cart.findIndex((item) => item.toString() === bookId.toString());
    if (index !== -1) {
        return errorResponse(400, "Item Already in cart");
    }

    user.cart.push(bookId);
    await user.save();
    return successResponse(200, "Item added to cart", user);
}

export const removeFromCartService = async (bookId, userId) => {
    validateId(bookId, "Invalid book ID");

    const book = await Book.findById(bookId);
    if (!book) errorResponse(404, "Book not found");

    const user = await User.findById(userId);
    if (!user) errorResponse(404, "User not found");

    const index = user.cart.findIndex((item) => item.toString() === bookId.toString());
    if (index !== -1) {
        user.cart.splice(index, 1);
    } else {
        errorResponse(400, "Item doesnt exist in cart");
    }

    await user.save();
    return successResponse(200, "Item Successfully removed from the card", user);
}