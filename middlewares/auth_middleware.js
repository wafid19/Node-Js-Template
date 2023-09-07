const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    const jwt_secret = process.env.JWT_SECRET;
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using valid token" })
    }
}