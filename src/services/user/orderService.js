import {v4 as uuidv4} from 'uuid';
import {errorResponse, successResponse} from "../../utils/responseHelper.js";
import axios from "axios";
import Order from "../../models/orderSchema.js";


const buildKhaltiPayload = (userDetails, cartItems) => {
    let sum = 0;
    const purchaseOrderId = uuidv4();
    const amount = cartItems.map((item) => sum += parseFloat(item.price.amount));

    const amountBreakDown = cartItems.map(item => ({
        label: item.title, amount: item.price.amount * 100
    }));

    const productDetails = cartItems.map(item => ({
        identity: item._id.toString(),   // convert ObjectId to string
        name: item.title, total_price: item.price.amount, quantity: 1, unit_price: item.price.amount
    }));

    return {
        options: {
            'method': 'POST', 'url': 'https://dev.khalti.com/api/v2/epayment/initiate/', 'headers': {
                'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                "return_url": "http://localhost:5173",
                "website_url": "http://localhost:3000",
                "amount": sum * 100,
                "purchase_order_id": purchaseOrderId,
                "purchase_order_name": "Books",
                "customer_info": {
                    "name": userDetails?.username || "guest", "email": userDetails?.email || "guest@guest.com"
                },
                "amount_breakdown": amountBreakDown,
                "product_details": productDetails,
                "merchant_username": "prashant",
                "merchant_extra": "prashant"
            })
        }, amount: sum, purchaseOrderId
    };
}

const khaltiPayment = async (option) => {
    try {
        const response = await axios({
            method: option.method, url: option.url, headers: option.headers, data: JSON.parse(option.body),
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data);
        errorResponse(400, "Khalti Payment Failed");
    }
}

const verifyKhaltiPayment = async (pidx) => {
    try {
        const response = await axios.post(
            "https://dev.khalti.com/api/v2/epayment/lookup",
            {pidx: pidx},
            {
                headers: {
                    Authorization: "Key live_secret_key_68791341fdd94846a146f0457ff7b455",
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error.response?.data);
        errorResponse(error.response?.data.status_code, "Khalti Payment Failed. " + error.response?.data.detail);
    }
}

const handlePaymentService = async (userDetails, cartItems) => {
    const payload = buildKhaltiPayload(userDetails, cartItems);
    const data = await khaltiPayment(payload.options);
    return {data, amount: payload.amount, purchaseOrderId: payload.purchaseOrderId};
}

export const createOrderService = async (userDetails, cartItems) => {

    const data = await handlePaymentService(userDetails, cartItems);
    console.log(data);

    const books = cartItems.map((item) => item._id);

    const newOrder = await Order.create({
        user: userDetails._id,
        books,
        orderDetails: {
            pidx: data.data.pidx,
            status: "pending",
            purchaseOrderId: data.purchaseOrderId,
            amount: data.amount,
        }
    });

    return successResponse(200, "Payment Initiated Successfully", newOrder);
}

export const checkPaymentService = async (pidx) => {
    return await verifyKhaltiPayment(pidx);
}