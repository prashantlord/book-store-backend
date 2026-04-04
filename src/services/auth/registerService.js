import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import createJwtTokens from "../../utils/createJwtToken.js";

export default async function registerService({username, email, password}) {
    try {
        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        }).lean();

        if (existingUser) {
            throw new Error("User already exists");
        }

        const saltRounds = 12;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username: username, email: email, password: hashPassword,
        });

        const token = createJwtTokens({
            id: user._id, username: user.username, email: user.email
        });

        return {
            user: {id: user._id, username: user.username, email: user.email}, token: token
        }
    } catch (error) {
        throw error;
    }
}