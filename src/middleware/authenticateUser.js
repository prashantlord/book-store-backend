import jwt from "jsonwebtoken";

export default async function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({message: 'Authorization header missing.'});
    }

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({message: 'JWT Token Required'});

    try {
        // Verify token
        // Attach user data to request
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        next(); // proceed to next middleware or route
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}