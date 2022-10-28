const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: "./src/index.tsx",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        configFile: false,
                        presets: ['@babel/preset-env', 'solid', '@babel/preset-typescript'],
                        plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },

    mode: "development",
    
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    devServer: {
        liveReload: true,
    },

    plugins: [
        new Dotenv({
            prefix: 'import.meta.env.'
        })
    ],

    stats: {
        loggingDebug: ['sass-loader'],
    }
}