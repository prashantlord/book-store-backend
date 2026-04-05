import {
    addToCartService,
    removeFromCartService,
    toggleFavoriteService,
    toggleWishlistService
} from "../services/user/libraryService.js";

export const toggleWishlist = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    try {
        const data = await toggleWishlistService(bookId, userId);
        return res.status(data.statusCode).json(data)
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({error: err.message});
    }

}

export const toggleFavorite = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.id;
    try {
        const data = await toggleFavoriteService(bookId, userId);
        return res.status(data.statusCode).json(data)
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({error: err.message});
    }
}

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    try {
        const data = await addToCartService(bookId, userId);
        return res.status(data.statusCode).json(data);
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({error: err.message});
    }
}

export const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    try {
        const data = await removeFromCartService(bookId, userId);
        return res.status(data.statusCode).json(data);
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({error: err.message});
    }
}
