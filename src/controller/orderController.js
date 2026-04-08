import {checkPaymentService, createOrderService} from "../services/user/orderService.js";
import {getUserCartItems} from "../services/user/userService.js";

export const purchaseCart = async (req, res) => {
    const userDetails = req.user.user;
    const cartItems = await getUserCartItems(userDetails._id);

    const data = await createOrderService(userDetails, cartItems);
    return res.status(data.statusCode).json(data);
}

export const checkPurchase = async (req, res) => {
    const pidx = req.params.pidx;

    const data = await checkPaymentService(pidx);
    return res.status(data.statusCode).json(data);
}