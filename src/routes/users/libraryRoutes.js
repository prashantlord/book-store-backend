import express from "express";
import {addToCart, removeFromCart, toggleFavorite, toggleWishlist} from "../../controller/libraryController.js";

const router = express.Router({mergeParams: true});

router.post("/wishlist/:bookId", toggleWishlist);
router.post("/favorite/:bookId", toggleFavorite);

router.post("/carts/:bookId", addToCart);
router.delete("/carts/:bookId", removeFromCart);

export default router;

