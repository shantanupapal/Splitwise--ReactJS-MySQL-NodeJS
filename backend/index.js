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

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true, // Allows to cookie be enabled
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe", // Keep Secret
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createPool({
    host: "splitwise-lab1.cjujexxer9yg.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "TEST",
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
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, result) => {
            console.log("Result", result);
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(
                    password,
                    result[0].password,
                    (error, response) => {
                        if (response) {
                            req.session.user = result;
                            console.log(req.session.user);
                            res.status(200).send(result);
                            // res.send(result, { message: "Successful Login" });
                            // res.writeHead(200, {
                            //     "Content-Type": "text/plain",
                            // });

                            // res.end("Successful Login");
                        } else {
                            // res.writeHead(201, {
                            //     "Content-Type": "text/plain",
                            // });
                            res.status(201).res.send({
                                message: "Wrong credentials",
                            });
                        }
                    }
                );
            } else {
                res.writeHead(404, {
                    "Content-Type": "text/plain",
                });
                res.end("User Doesn't exist");
            }
        }
    );
});

app.post("/logout", function (req, res) {
    if (!req.session.user) {
        res.redirect("/");
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
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users VALUES (6,?,?)",
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

app.listen(3001, () => {
    console.log("Running on 3001");
});
