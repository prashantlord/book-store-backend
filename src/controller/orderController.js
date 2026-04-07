import {createOrderService} from "../services/user/orderService.js";
import {getUserCartItems} from "../services/user/userService.js";

export const purchaseCart = async (req, res) => {
    const userDetails = req.user;
    const cartItems = await getUserCartItems(userDetails.id);
    try {
        const data = await createOrderService(userDetails, cartItems);
        return res.status(data.statusCode).json(data);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({err, error: err.message});
    }
}