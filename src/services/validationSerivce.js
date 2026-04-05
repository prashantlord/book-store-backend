import mongoose from "mongoose";
import {errorResponse} from "./responseService.js";

export const validateId = (id, errorMessage = "Invalid Id") => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        errorResponse(400, errorMessage);
    }
}