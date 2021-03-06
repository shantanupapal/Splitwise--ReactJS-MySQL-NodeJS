const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../pool");

router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);

    pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            console.log("Result", result);
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain",
                });
                res.send("Database Error");
                // res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(
                    password,
                    result[0].password,
                    (error, response) => {
                        if (response) {
                            res.cookie("cookie", result[0].name, {
                                maxAge: 90000000,
                                httpOnly: false,
                                path: "/",
                            });
                            console.log("RESULT: ", result);
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
                    }
                );
            } else {
                res.writeHead(404, {
                    "Content-Type": "text/plain",
                });
                res.end("No user found");
                // res.status(404).send({ message: "No user found" });
            }
        }
    );
});

module.exports = router;
// module.exports.router;
