import {
    addToCartService,
    removeFromCartService,
    toggleFavoriteService,
    toggleWishlistService
} from "../services/user/libraryService.js";

export const toggleWishlist = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.user._id;

    const data = await toggleWishlistService(bookId, userId);
    return res.status(data.statusCode).json(data)

}

export const toggleFavorite = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.user._id;

    const data = await toggleFavoriteService(bookId, userId);
    return res.status(data.statusCode).json(data)
}

export const addToCart = async (req, res) => {
    const userId = req.user.user._id;
    const bookId = req.params.bookId;

    const data = await addToCartService(bookId, userId);
    return res.status(data.statusCode).json(data);
}

export const removeFromCart = async (req, res) => {
    const userId = req.user.user._id;
    const bookId = req.params.bookId;

    const data = await removeFromCartService(bookId, userId);
    return res.status(data.statusCode).json(data);
}
