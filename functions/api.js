const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/User", (req, res) => {
    res.json({
        "path": "Home",
        "firstName": "Chidera",
        "LastName": "Nwankwo"
    });
});

app.get("/json", (req, res) => {
    res.json({
        "path": "json",
        "author": "Chidera"
    });
});

module.exports.handler = serverless(app);