const path = require("path");
const fs = require("fs");
const express = require("express");
const cookieParser = require('cookie-parser')
const webpackConfig = require("./webpack.config.js");
const webpack = require("webpack");

// dotenv
require("dotenv").config();

// compile webpack config
const compiler = webpack(webpackConfig);

// create express app
const app = express();

// statically add dist
app.use((req, res, next) => {
	// arbitrary headers
	res.set('Cache-Control', 'no-store');
	res.set("Access-Control-Allow-Origin", "https://irisu.neocities.org");
	res.set("Access-Control-Allow-Credentials", "true");
	res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.set("Vary", "Cookie, Origin");

	next();
})

// middleware
app.use(require("express").json());
app.use(cookieParser())
require("./lib/middleware/RouterLoader")(app);

app.use("/dist", express.static("dist"));
app.use("/static", express.static("static"));

// add webpack dev middleware
app.use(
    require("webpack-dev-middleware")(compiler, {
        publicPath: "/dist",
    })
);

// add webpack hot middleware
app.use("/dist", require("webpack-hot-middleware")(compiler, {
	log: console.log,
	path: "/__webpack_hmr",
}));


app.listen(7542)