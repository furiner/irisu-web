const pool = require("../../pool");

const argon2 = require("argon2");
const router = require("express").Router();
const { randomWords } = require("../../config/config");

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

module.exports = router;