const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");

module.exports = (app) => {
    // Set Proxy
    app.set("trust proxy", false);

    // Set Env File
    dotenv.config({
        path: path.resolve(__dirname, "..", "..", ".env")
    });

    // enable CORS
    app.use(cors({ origin: '*' }));
    
    // Secure the app by setting various HTTP headers off.
    app.use(helmet({ contentSecurityPolicy: false }));

    // Logger
    app.use(morgan("common"));

    // Tell express to recognize the incoming Request Object as a JSON Object
    app.use(express.json());

    // app.use(express.static(path.join(__dirname, "..", "..", "public")));

    // Serve API documentation
    app.use("/docs", express.static(path.join(__dirname, "..", "..", "docs")));

    // Express body parser
    app.use(express.urlencoded({ extended: true }));

    // Serve Uploads
    app.use("/uploads", express.static(path.join(__dirname, "..", "..", "uploads")));

    return app;
};
