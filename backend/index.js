const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.json());

const saltRounds = 10;
app.set("view engine", "ejs");
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true, // Allows to cookie be enabled
    })
);
//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});

app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        key: "userId",
        secret: "splitwise", // Keep Secret
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     expires: 60 * 60 * 24,
        // },
        duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
        activeDuration: 5 * 60 * 1000,
    })
);

const db = mysql.createPool({
    host: "splitwise-lab1.cjujexxer9yg.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "splitwise",
});

// app.get("/", (req, res) => {
//     const sqlInsert =
//         "INSERT INTO users VALUES (1, 'Shantanu Papal', 'hello');";
//     db.query(sqlInsert, (err, result) => {
//         res.send("hello Shantanu");
//     });
// });

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        console.log("Result", result);
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    res.cookie("cookie", result[0].name, {
                        maxAge: 900000,
                        httpOnly: false,
                        path: "/",
                    });
                    req.session.user = result;
                    console.log(req.session.user);
                    res.status(200).send(result);

                    // res.send(result, { message: "Successful Login" });
                    // res.writeHead(200, {
                    //     "Content-Type": "text/plain",
                    // });

                    // res.end("Successful Login");
                } else {
                    res.writeHead(201, {
                        "Content-Type": "text/plain",
                    });
                    res.end("Wrong credentials");
                    // res.status(201).res.send(null, {
                    //     message: "Wrong credentials",
                    // });
                }
            });
        } else {
            res.writeHead(404, {
                "Content-Type": "text/plain",
            });
            res.end("No user found");
            // res.status(404).send({ message: "No user found" });
        }
    });
});

app.get("/logout", function (req, res) {
    if (!req.session.user) {
        res.writeHead(404, {
            "Content-Type": "text/plain",
        });
        // res.end(result);
        res.end("Please login!");
    } else {
        req.session.destroy();
        res.writeHead(200, {
            "Content-Type": "text/plain",
        });
        // res.end(result);
        res.end("Logout Successful");
        //res.redirect("/");
    }
});

app.post("/signup", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    console.log("Request for SignUp");
    console.log(req.body);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users (name,email,password) VALUES (?,?,?)",
            [name, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.writeHead(404, {
                        "Content-Type": "text/plain",
                    });
                    res.end("Email already exist. Please enter another email");
                } else {
                    console.log("Result from db");
                    console.log(result);
                    res.cookie("cookie", name, {
                        maxAge: 900000,
                        httpOnly: false,
                        path: "/",
                    });
                    req.session.user = result;
                    console.log(req.session.user);
                    res.status(200).send(result);
                }
            }
        );
    });
});

app.listen(3001, () => {
    console.log("Running on 3001");
});
