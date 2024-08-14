var express = require("express");
var app = express();
var cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

require("dotenv").config({ path: __dirname + "/.env" });
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/accessToken", async (req, res) => {
    // req.query.code;
    console.log("accessToken");
    console.log(req.query.code);
    const params = "?client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        res.json(data);
      });
});

//get user details
app.get("/user", async (req, res) => {

    console.log("users");
    console.log(req.get("Authorization"));
    req.get("Authorization");//bearer token

    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});