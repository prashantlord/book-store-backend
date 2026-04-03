import User from "../../models/user.js";
import express from "express";
import {getUser, login, register} from "../../controller/authController.js";
import {validate} from "../../middleware/validate.js";
import {loginSchema, registerSchema} from "../../schema/auth.schema.js";
import authenticateUser from "../../middleware/authenticateUser.js";

const router = express.Router();

router.get('/users', authenticateUser, getUser);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;

