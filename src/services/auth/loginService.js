import bcrypt from 'bcryptjs';
import User from "../../models/user.js";
import createJwtTokens from "../../utils/createJwtToken.js";

export default async function loginService({email, password}) {

    // 1. Find user by email
    const user = await User.findOne({email}).lean();
    if (!user) {
        throw new Error("Invalid email.")
    }

    // 2. Compare plain password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    // 3. Generate JWT token
    const token = createJwtTokens({id: user._id, email: user.email});

    return {
        user: {id: user._id, username: user.username, email: user.email}, token: token
    }
}