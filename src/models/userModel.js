import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true, maxLength: 255, lowercase: true, trim: true
    }, email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email"],
        trim: true
    }, password: {
        type: String, required: true, minlength: 8
    }, avatar_url: {
        type: String, default: ""
    }, role: {
        type: String, enum: ["reader", "author", "admin"], default: "reader"
    }, wishlist: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Book",
    }], favorites: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Book",
    }], cart: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Book",
    }], library: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Book",
    }]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;