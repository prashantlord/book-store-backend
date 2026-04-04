import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    avatar_url: {type: String, required: false, default: ""},
    role: {
        type: String,
        enum: ["reader", "author", "admin"],
        default: "reader"
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;