import registerService from "../services/auth/registerService.js";
import loginService from "../services/auth/loginService.js";
import {userDetailsService} from "../services/user/userService.js";
import {logoutService} from "../services/auth/logoutService.js";

export async function register(req, res) {
    const {username, email, password} = req.body;

    const data = await registerService(username, email, password);

    return res.status(data.statusCode).json(data);
}

export async function login(req, res) {
    const {email, password} = req.body;

    const data = await loginService(email, password);

    return res.status(data.statusCode).json(data);
}

export async function logout(req, res) {
    const user = req.user.user;

    const data = await logoutService(user);

    return res.status(data.statusCode).json(data);
}

export async function getUser(req, res) {
    const user = req.user.user;

    const data = await userDetailsService(user);

    return res.status(data.statusCode).json(data);
}

