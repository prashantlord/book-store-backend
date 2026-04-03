export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body); // validated + sanitized
        next();
    } catch (err) {
        return res.status(400).json({
            message: "Data Validation error",
            errors: err.issues
        });
    }
}