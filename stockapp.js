//import express module
var express = require("express");
var ejs = require("ejs");
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require("body-parser");
//require express session
var session = require("express-session");
var cookieParser = require("cookie-parser");
var router = express.Router();
//const sessionStore = require('session-store')(session);
//use session to store user data between HTTP requests
app.use(
  session({
    secret: "1234secret",
    resave: false,
    saveUninitialized: true,
    path: "/",
  })
);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}
app.use(ignoreFavicon);

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use cookie parser to parse request headers
app.use(cookieParser());

//specify the path of static directory
app.use(express.static(__dirname + "/public"));
//set the view engine to ejs
app.set("view engine", "ejs");
//set the directory of views
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  console.log("Session Data : ", req.session.user);
  res.render("index");
});

app.get("/stock", (req, res) => {
  console.log("Session Data : ", req.session.user);
  res.render("index");
});
app.post("/stock", (req, res) => {
  console.log("Session Data : ", req.session.user);
  res.render("stock");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  res.render("thankyou");
});
app.get("/thankyou", (req, res) => {
  res.render("thankyou");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.render("stock");
  } else res.render("login");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
