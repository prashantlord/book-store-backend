import User from "../../models/userModel.js";
import {errorResponse, successResponse} from "../responseService.js";

export const userDetailsService = async (userId) => {
    const userDetails = await User.findById(userId)
        .select("-password")
        .populate('wishlist favorites library')
        .populate({
            path: 'cart', populate: {path: 'author'}
        })

    if (!userDetails) {
        errorResponse(404, "User details not found");
    }
    return successResponse(200, "User Data Fetched Successfully.", userDetails);
}

export const getUserCartItems = async (userId) => {
    const user = await User.findById(userId)
        .select('cart')
        .populate({
            path: 'cart',
            select: '-fileUrl -reviews'
        });

    if (!user) {
        errorResponse(404, "User cart not found");
    }

    return user.cart;
};