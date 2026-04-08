import express from "express";
import {getUser, login, logout, register} from "../../controller/authController.js";
import {validate} from "../../middleware/validate.js";
import {loginSchema, registerSchema} from "../../schema/auth.schema.js";
import authenticateUser from "../../middleware/authenticateUser.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.delete("/logout", authenticateUser, logout);
router.get('/users', authenticateUser, getUser);

export default router;
