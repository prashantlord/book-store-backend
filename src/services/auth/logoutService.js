import {successResponse} from "../../utils/responseHelper.js";

export const logoutService = (user) => {
    if (user)
        return successResponse(200, "Successfully logged out");
}