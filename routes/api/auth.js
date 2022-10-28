const pool = require("../../pool");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const router = require("express").Router();
const { randomWords, jwtSecret } = require("../../config/config");

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Registration & Login
router.post("/register", async (req, res) => {
    // body assert
    if (!req.body.username) {
        return res.status(400).json({
            code: 400,
            message: "you are missing a username!"
        });
    }

    const keyGen = new Array(16).fill(0).map(x => randomWords[getRndInteger(0, randomWords.length - 1)]).join(" ");

    // check if username is taken
    const [users] = await pool.execute("SELECT * FROM users WHERE username = ?", [req.body.username]);

    if (users.length > 0) {
        return res.status(400).json({
            code: 400,
            message: "username is taken!"
        });
    }

    // create user
    await pool.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", [req.body.username, await argon2.hash(keyGen)]);

    // return key
    return res.status(200).json({
        code: 200,
        message: "user created!",
        data: {
            key: keyGen
        }
    });
});

router.post("/login", async (req, res) => {
    // body assert
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            code: 400,
            message: "you are missing a username or password!"
        });
    }
    
    // check if the password is valid
    const [users] = await pool.execute("SELECT * FROM users WHERE username = ?", [req.body.username]);

    if (users.length === 0) {
        return res.status(400).json({
            code: 400,
            message: "username or password is incorrect!"
        });
    }

    const user = users[0];

    if (!await argon2.verify(user.password_hash, req.body.password)) {
        return res.status(400).json({
            code: 400,
            message: "username or password is incorrect!"
        });
    }

    // now that the user is authenticated, we can check for an active session
    const [ sessions ] = await pool.execute("SELECT * FROM sessions WHERE user_id = ?", [user.id]);

    if (sessions.length > 0) {
        // jwt validation
        const session = sessions[0];

        try {
            jwt.verify(session.token, jwtSecret);

            return res.status(200).json({
                code: 200,
                message: "you are already logged in!",
                data: {
                    token: session.token
                }
            });
        } catch (err) {
            // invalid token
            await pool.execute("DELETE FROM sessions WHERE id = ?", [session.id]);
        }
    }

    // create a new session
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, jwtSecret, {
        expiresIn: "30d"
    });

    // save the session
    await pool.execute("INSERT INTO sessions (user_id, token) VALUES (?, ?)", [user.id, token]);

    return res.status(200).json({
        code: 200,
        message: "you have been logged in!",
        data: {
            token
        }
    });
});

router.post("/validate", async(req, res) => {
    if (!req.body.token) {
        return res.status(400).json({
            code: 400,
            message: "you are missing a token!"
        });
    }

    try {
        const decoded = jwt.verify(req.body.token, jwtSecret);

        // get account details
        const [users] = await pool.execute("SELECT * FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) {
            return res.status(400).json({
                code: 400,
                message: "invalid token!"
            });
        }

        const user = users[0];

        // delete password hash
        delete user.password_hash;

        return res.status(200).json({
            code: 200,
            message: "token is valid!",
            data: {
                valid: true,
                account: user
            }
        });
    } catch (err) {
        return res.status(200).json({
            code: 200,
            message: "token is invalid!",
            data: {
                valid: false,
            }
        });
    }
})

module.exports = router;