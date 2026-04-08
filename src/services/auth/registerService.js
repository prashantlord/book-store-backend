import User from "../../models/userModel.js";
import {errorResponse, successResponse} from "../../utils/responseHelper.js";
import {hashPassword, generateJwtToken} from "../../utils/helperFunctions.js";

export default async function registerService(username, email, password) {
    const existingUser = await User.findOne({
        $or: [{email}, {username}]
    }).lean();

    if (existingUser) {
        errorResponse(404, "User already exists")
    }

    password = await hashPassword(password);

    const user = await User.create({
        username, email, password,
    });

    const token = generateJwtToken(user);

    const data = {user, token};

    return successResponse(200, "Registration Successfully", data);
}