const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/", (req, res) => {
    const user_id = req.body.user_id;
    console.log("User_Id : " + user_id);
    const borrowers = [];
    const payers = [];
    pool.query(
        "SELECT * FROM splitwise.one_to_one WHERE user1_id = ?",
        [user_id],
        (err, result) => {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain",
                });
            }
            if (result.length > 0) {
                console.log("user_payer: ", result);
                const i_owe = [];
                const they_owe = [];
                const all = [];
                result.forEach((borrower) =>
                    borrowers.push([
                        borrower.user1_id,
                        borrower.user2_id,
                        borrower.amount,
                    ])
                );
                console.log(borrowers);

                pool.query(
                    "SELECT * FROM splitwise.one_to_one WHERE user2_id = ?",
                    [user_id],
                    (err, result) => {
                        if (err) {
                            res.writeHead(500, {
                                "Content-Type": "text/plain",
                            });
                        }
                        if (result.length > 0) {
                            console.log("user_borrower: ", result);
                            result.forEach((payer) =>
                                payers.push([
                                    payer.user1_id,
                                    payer.user2_id,
                                    payer.amount,
                                ])
                            );
                            console.log(payers);

                            borrowers.forEach((borrower) => {
                                payers.forEach((payer) => {
                                    if (borrower[1] === payer[0]) {
                                        if (borrower[2] - payer[2] === 0) {
                                            // console.log(borrower[0]);
                                            // console.log(payer[0]);
                                            // console.log(borrower[2] - payer[2]);
                                            console.log("equal");
                                            //Settled = 1
                                            pool.query(
                                                "UPDATE splitwise.one_to_one SET amount = ?, settled = ? WHERE user1_id = ? AND user2_id = ? OR user1_id = ? AND user2_id = ?",
                                                [
                                                    0,
                                                    1,
                                                    borrower[0],
                                                    payer[0],
                                                    payer[0],
                                                    borrower[0],
                                                ],
                                                (err, result) => {
                                                    if (err) {
                                                        res.writeHead(500, {
                                                            "Content-Type":
                                                                "text/plain",
                                                        });
                                                    } else {
                                                        console.log(
                                                            "one_to_one rows inserted: ",
                                                            result.affectedRows
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                        if (borrower[2] - payer[2] < 0) {
                                            // console.log(borrower[2] - payer[2]);
                                            all.push(payer[0]);
                                            i_owe.push([
                                                payer[0],
                                                borrower[2] - payer[2],
                                            ]);
                                        }
                                        if (borrower[2] - payer[2] > 0) {
                                            // console.log(borrower[2] - payer[2]);
                                            all.push(borrower[1]);
                                            they_owe.push([
                                                borrower[1],
                                                borrower[2] - payer[2],
                                            ]);
                                        }
                                    }
                                });
                            });

                            if (all.length > 0) {
                                let i_owe_total = 0;
                                let they_owe_total = 0;
                                pool.query(
                                    "SELECT user_id,name FROM splitwise.users WHERE user_id IN (?)",
                                    [all],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log(result);
                                            i_owe.forEach((ower) => {
                                                i_owe_total =
                                                    i_owe_total + ower[2];
                                                console.log(
                                                    "i_owe_total: ",
                                                    i_owe_total
                                                );
                                                result.forEach((user) => {
                                                    if (
                                                        ower[0] === user.user_id
                                                    ) {
                                                        ower.push(user.name);
                                                    }
                                                });
                                            });
                                            they_owe.forEach((ower) => {
                                                they_owe_total =
                                                    they_owe_total + ower[2];
                                                result.forEach((user) => {
                                                    if (
                                                        ower[0] === user.user_id
                                                    ) {
                                                        ower.push(user.name);
                                                    }
                                                });
                                            });

                                            // console.log(
                                            //     "i_owe_total: ",
                                            //     i_owe_total
                                            // );
                                            // console.log(
                                            //     "they_owe_total: ",
                                            //     they_owe_total
                                            // );

                                            let dashboard_details = {
                                                i_owe: i_owe,
                                                they_owe: they_owe,
                                            };

                                            res.status(200).send(
                                                JSON.stringify(
                                                    dashboard_details
                                                )
                                            );
                                        }
                                    }
                                );
                            }

                            // res.status(200).send(JSON.stringify(result));
                        }
                    }
                );

                // res.status(200).send(JSON.stringify(result));
            } else {
                console.log("I am HERE!!!!!!!!!!");
            }
        }
    );

    // pool.query(
    //     "SELECT * FROM splitwise.one_to_one WHERE user2_id = ?",
    //     [user_id],
    //     (err, result) => {
    //         if (err) {
    //             res.writeHead(500, {
    //                 "Content-Type": "text/plain",
    //             });
    //         }
    //         if (result.length > 0) {
    //             console.log("Result: ", result);
    //             result.forEach((payer) =>
    //                 payers.push([payer.user1_id, payer.amount])
    //             );
    //             console.log(payers);

    //             borrowers.forEach((borrower) => {
    //                 payers.forEach((payer) => {
    //                     if (borrower[0] === payer[0]) {
    //                         if (borrower[1] - payer[1] === 0) {
    //                             console.log(borrower[1] - payer[1]);
    //                             console.log("equal");
    //                         }
    //                         if (borrower[1] - payer[1] < 0) {
    //                             console.log(borrower[1] - payer[1]);
    //                             console.log("neg");
    //                         }
    //                         if (borrower[1] - payer[1] > 0) {
    //                             console.log(borrower[1] - payer[1]);
    //                             console.log("pos");
    //                         }
    //                     }
    //                 });
    //             });

    //             // res.status(200).send(JSON.stringify(result));
    //         }
    //     }
    // );
});

module.exports = router;
