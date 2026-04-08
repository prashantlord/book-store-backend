import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    orderDetails: {
        pidx: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            required: true,
            enum: ['failed', 'pending', 'completed']
        },
        purchaseOrderId: {
            type: String,
            unique: true,
        },
        paymentId: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        amount: {
            type: Number,
            required: true,
        },
        mobileNumber: {
            type: Number,
        },
        merchantName: {
            type: String,
        },
    }
})

const Order = mongoose.model("Order", orderSchema);

export default Order;