import {v4 as uuidv4} from 'uuid';
import {errorResponse} from "../responseService.js";
import axios from "axios";


const buildKhaltiPayload = (userDetails, cartItems) => {
    let sum = 0;
    const amount = cartItems.map((item) => sum += parseFloat(item.price.amount)) * 100;

    const purchaseOrderId = uuidv4();

    const amountBreakDown = cartItems.map(item => ({
        label: item.title, amount: item.price.amount * 100
    }));
    console.log(amountBreakDown);

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
                "return_url": "http://localhost:5173/profile/library",
                "website_url": "http://localhost:3000",
                "amount": amount,
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
        }, purchaseOrderId
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
        return errorResponse(400, "Something went wrong");
    }
}

const handlePaymentService = async (userDetails, cartItems) => {
    const payload = buildKhaltiPayload(userDetails, cartItems);
    return await khaltiPayment(payload.options);
}

export const createOrderService = async (userDetails, cartItems) => {
    const res = await handlePaymentService(userDetails, cartItems);
    console.log(res);
}