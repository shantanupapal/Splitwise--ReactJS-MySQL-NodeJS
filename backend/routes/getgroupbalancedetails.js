const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/", (req, res) => {
    const group_id = parseInt(req.body.group_id);
    console.log("Group_id: ", group_id);
    const payers = [];
    const borrowers = [];
    const all_balances = [];
    pool.query(
        "SELECT u.name,paid_by, SUM(amount) AS amount FROM splitwise.expenses e JOIN splitwise.users u ON e.paid_by = u.user_id WHERE group_id=? group by paid_by ORDER BY paid_by;",
        [group_id],
        (err, results) => {
            if (err) {
                console.log("Error: ", err);
                res.writeHead(500, {
                    "Content-Type": "text/plain",
                });
                res.send("Database Error");

                // res.send({ err: err });
            }
            // if (result.length === 0) {
            //     //check only for liables group
            // }
            if (results.length >= 0) {
                // console.log("PAYERS: ", results);
                results.forEach((result) => {
                    payers.push([result.name, result.paid_by, result.amount]);
                });

                pool.query(
                    "SELECT u.name, liable, SUM(amount) AS amount FROM splitwise.expenses e JOIN splitwise.users u ON e.liable = u.user_id WHERE group_id=? group by liable ORDER BY liable;",
                    [group_id],
                    (err, results) => {
                        if (err) {
                            console.log("Error: ", err);
                            res.writeHead(500, {
                                "Content-Type": "text/plain",
                            });
                            res.send("Database Error");

                            // res.send({ err: err });
                        }
                        // if (result.length === 0) {
                        //     console.log("No users found");
                        // }
                        if (results.length >= 0) {
                            // console.log("BORROWERS: ", result);
                            results.forEach((result) => {
                                borrowers.push([
                                    result.name,
                                    result.liable,
                                    result.amount,
                                ]);
                            });
                            console.log("BORROWERS: ", borrowers);
                            console.log("PAYERS: ", payers);

                            payers.forEach((payer) => {
                                borrowers.forEach((borrower) => {
                                    if (payer[1] === borrower[1]) {
                                        let balance = payer[2] - borrower[2];
                                        all_balances.push([
                                            payer[0],
                                            payer[1],
                                            balance,
                                        ]);
                                    }
                                });
                            });

                            console.log(all_balances);
                            res.status(200).send(all_balances);
                        }
                    }
                );
                // res.status(200).send(JSON.stringify(result));
            }
        }
    );
});

module.exports = router;
