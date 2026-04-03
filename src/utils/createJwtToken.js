import jwt from "jsonwebtoken";

export default function createJwtTokens(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
}