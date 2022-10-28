const pool = require("../../pool");

const argon2 = require("argon2");
const router = require("express").Router();

const randomWords = [
    "riamu",
    "cheese",
    "irisu",
    "gooey",
    "parabola",
    "toast",
    "portmanteau",
    "fondue",
    "meow",
    "friend",
    "blue",
    "fjord",
    "anticonstitussionalissimamente",
    "antidisestablishmentarianism",
    "voluptuous",
    "armpit",
    "pneumonoultramicroscopicsilicovolcanoconiosis",
    "experience",
    "shoe",
    "keiko",
    "milk",
    "pterodactyl",
    "fathom",
    "duplicate",
    "dilapidated",
    "llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch",
    "llanhyfryddawelllehynafolybarcudprindanfygythiadtrienusyrhafnauole",
    "lifestyle", "weight", "inflation", "tiger", "distortion", "branch", "crude", "commerce", "cash", "thinker", "stain", "determine", "round", "carve", "character", "memory", "communication", "quarter", "onion", "build", "sum", "TRUE", "frequency", "gold", "wire", "art", "look", "neighborhood", "meet", "purpose", "aluminium", "manager", "critic", "beer", "pneumonia", "peace", "pension", "suffer", "relate", "shelter", "donor", "fade", "athlete", "story", "integrity", "expand", "retain", "stroll", "ground", "item",
    "canvas", "repetition", "scratch", "satisfied", "thoughtful", "solve", "glue", "fashion", "pepper", "thumb", "pier", "nuance", "warn", "galaxy", "afford", "electron", "expose", "dominate", "abbey", "west", "liability", "listen", "stall", "anniversary", "carriage", "relax", "nun", "bind", "ward", "finish", "improvement", "racism", "appointment", "vegetarian", "image", "singer", "revival", "quiet", "daughter", "loyalty", "blade", "bacon", "episode", "faithful", "coalition", "round", "flight", "dragon", "infinite", "onion",
    "organisation", "stay", "cherry", "committee", "zone", "brilliance", "agile", "crusade", "deficit", "half", "export", "essay", "quiet", "van", "convict", "rugby", "inn", "beginning", "finger", "rest", "house", "drawing", "onion", "rage", "commerce", "courage", "environmental", "conscience", "include", "mark", "sacred", "stall", "resign", "avant-garde", "snuggle", "deep", "mobile", "threat", "coal", "knit", "respect", "root", "boom", "clarify", "me", "theme", "obligation", "coast", "ribbon", "wheel",
];

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