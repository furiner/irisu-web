module.exports = (req, res, next) => {
    function antiYou() {
        if (req.path.startsWith("/api")) {
            res.status(403).json({
                status: 403,
                message: "you are not allowed to access this endpoint."
            });
        } else {
            res.status(403).send("you are not allowed to access this endpoint.");
        }
    }
    if (req.headers.authorization) {
        // check if the authorization header is a valid token
        let token = req.headers.authorization;
        if (token === process.env.ADMIN_TOKEN) {
            // if it is, set the admin flag to true
            return antiYou();
        }
    } else if (req.cookies.admin) {
        // check if the admin cookie is set
        if (req.cookies.admin === process.env.ADMIN_TOKEN) {
            // if it is, set the admin flag to true
            return antiYou();
        }
    } else if (req.query.token) {
        // check if the token query is set
        if (req.query.token === process.env.ADMIN_TOKEN) {
            // if it is, set the admin flag to true
            return antiYou();
        }
    }

    // cool
    next();
};