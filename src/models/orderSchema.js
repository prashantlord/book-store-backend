import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    orderDetails: {
        status: {
            type: String,
            required: true,
            enum: ['failed', 'pending', 'completed']
        },
        paymentId: {
            type: String,
            required: true,
        }
    }
})

const Order = mongoose.model("Order", orderSchema);

export default Order;