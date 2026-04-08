import User from "../../models/userModel.js";
import {errorResponse, successResponse} from "../../utils/responseHelper.js";

export const userDetailsService = async (user) => {
    if (!user) {
        errorResponse(404, "User details not found");
    }
    return successResponse(200, "User Data Fetched Successfully.", user);
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