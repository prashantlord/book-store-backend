import registerService from "../services/auth/registerService.js";
import loginService from "../services/auth/loginService.js";
import {userDetailsService} from "../services/user/userService.js";

export async function getUser(req, res) {
    const userId = req.user.id;
    try {
        const data = await userDetailsService(userId);
        return res.status(data.statusCode).json(data);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({err, error: err.message});
    }
}

export async function login(req, res) {
    const {email, password} = req.body;
    try {
        const user = await loginService({email, password});
        return res.json(user);
    } catch (err) {
        res.status(400).json({err, error: err.message});
    }
}

export async function register(req, res) {
    const {username, email, password} = req.body;

    try {
        const user = await registerService({username, email, password});
        return res.json(user);
    } catch (err) {
        res.status(400).json({err, error: err.message});
    }
}


