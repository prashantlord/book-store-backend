import bcrypt from "bcryptjs";
import {errorResponse} from "./responseHelper.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

export const checkHashPassword = async (password, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) errorResponse(401, "Invalid password.");
}

export const generateJwtToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
}

export const validateId = (id, statusCode = 404, errorMessage = "Invalid Id") => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        errorResponse(statusCode, errorMessage);
    }
}