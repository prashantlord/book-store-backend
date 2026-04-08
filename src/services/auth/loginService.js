import {errorResponse, successResponse} from "../../utils/responseHelper.js";
import User from "../../models/userModel.js";
import {checkHashPassword, generateJwtToken} from "../../utils/helperFunctions.js";

export default async function loginService(email, password) {
    const user = await User.findOne({email}).lean();
    if (!user) errorResponse(404, "Invalid email.");

    await checkHashPassword(password, user.password);

    const token = generateJwtToken(user);

    const data = {user, token};

    return successResponse(200, "Login successful", data);
}