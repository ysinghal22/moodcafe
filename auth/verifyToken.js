const jwt = require("jsonwebtoken");

function auth (req, res, next) {
    const auth_token = req.header('auth-token');

    if(!auth_token) return res.status(401).json({
            message: "Access denied!"
    })

    try{
        let bearer = auth_token.split(' ');
        const token = bearer[1];

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).json(
            {
                message: "Invalid Token"
            }
        );
    }
}

module.exports = auth;