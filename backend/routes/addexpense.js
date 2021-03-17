const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/", (req, res) => {
    const group_id = parseInt(req.body.group_id);
    const description = req.body.description;
    const date = new Date();
    const total_amount = parseFloat(req.body.total_amount);
    const paid_by = req.body.paid_by;
    const liables = req.body.liables;
    const amount = total_amount / liables.length;
    const values = [];

    liables.forEach((liable) => {
        if (paid_by !== liable) {
            values.push([
                group_id,
                description,
                date,
                total_amount,
                paid_by,
                liable,
                amount,
            ]);
        }
    });
    console.log("values: ", values);

    //Entries to one_to_one table
    liables.forEach((liable) => {
        if (paid_by !== liable) {
            console.log("IN HERE");
            pool.query(
                "SELECT amount FROM splitwise.one_to_one WHERE user1_id = ? AND user2_id = ?",
                [paid_by, liable],
                (err, result) => {
                    if (err) {
                        console.log("error: ", err);
                    }
                    if (result.length === 0) {
                        pool.query(
                            "INSERT INTO splitwise.one_to_one (user1_id, user2_id, amount, settled) VALUES (?,?,?,?)",
                            [paid_by, liable, amount, 0],
                            (err, result) => {
                                if (err) {
                                    console.log("Error: " + err);
                                } else {
                                    console.log("New entry added");
                                }
                            }
                        );
                    } else {
                        const db_amount = result[0].amount;
                        // let settled = 0;
                        console.log(result[0].amount);
                        let new_amount = amount + db_amount;

                        pool.query(
                            "UPDATE splitwise.one_to_one SET amount = ?, settled = ? WHERE user1_id = ? AND user2_id = ?",
                            [new_amount, settled, paid_by, liable],
                            (err, result) => {
                                if (err) {
                                    console.log("error: ", err);
                                } else {
                                    console.log(
                                        "one_to_one rows inserted: ",
                                        result.affectedRows
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    });

    //Entry to expense table
    const query =
        "INSERT INTO splitwise.expenses (group_id, description, date, total_amount, paid_by, liable, amount) VALUES ?";

    pool.query(query, [values], (err, result) => {
        if (err) {
            console.log("error: ", err);
        } else {
            console.log("total rows inserted: ", result.affectedRows);
            // res.status(200).end("Expense Added");
        }
    });
});

module.exports = router;
