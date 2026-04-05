import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String, required: true,
    }, description: {
        type: String, required: true,
    }, author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    }, price: {
        amount: {
            type: Number, required: true,
        }, currency: {
            type: String, enum: ['USD', 'EUR', 'INR', "NPR"], required: true,
        }
    }, categories: [{
        type: String,
        enum: ['Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Non-Fiction', 'Biography', 'History', 'Comics', 'Technology'],
        required: true,
    }], fileUrl: {
        type: String, required: true,
    }, coverImageUrl: {
        type: String,
    }, reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true,
        }, rating: {
            type: Number, min: 1, max: 5, required: true,
        }, comment: String,
    }]
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;