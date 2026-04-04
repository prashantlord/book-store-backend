import registerService from "../services/auth/registerService.js";
import loginService from "../services/auth/loginService.js";

export async function getUser(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(401).json({message: 'Invalid token'});
    }

    res.status(200).json({id: user._id, username: user.username, email: user.email});
}

export async function login(req, res) {
    const {email, password} = req.body;
    try {
        const user = await loginService({email, password});
        return res.json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

export async function register(req, res) {
    const {username, email, password} = req.body;

    try {
        const user = await registerService({username, email, password});
        return res.json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}


