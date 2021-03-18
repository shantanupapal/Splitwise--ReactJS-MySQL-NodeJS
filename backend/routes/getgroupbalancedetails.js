const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/", (req, res) => {
    const group_id = parseInt(req.body.group_id);
    console.log("Group_id: ", group_id);
    pool.query(
        "SELECT u.name,paid_by, SUM(amount) AS amount FROM splitwise.expenses e JOIN splitwise.users u ON e.paid_by = u.user_id WHERE group_id=? group by paid_by ORDER BY paid_by;",
        [group_id],
        (err, result) => {
            if (err) {
                console.log("Error: ", err);
                res.writeHead(500, {
                    "Content-Type": "text/plain",
                });
                res.send("Database Error");

                // res.send({ err: err });
            }
            if (result.length === 0) {
                //check only for liables group
            }
            if (result.length > 0 || result.length === 0) {
                console.log("PAYERS: ", result);

                pool.query(
                    "SELECT u.name, liable, SUM(amount) FROM splitwise.expenses e JOIN splitwise.users u ON e.liable = u.user_id WHERE group_id=? group by liable ORDER BY liable;",
                    [group_id],
                    (err, result) => {
                        if (err) {
                            console.log("Error: ", err);
                            res.writeHead(500, {
                                "Content-Type": "text/plain",
                            });
                            res.send("Database Error");

                            // res.send({ err: err });
                        }
                        if (result.length === 0) {
                            console.log("No users found");
                        }
                        if (result.length > 0) {
                            console.log("BORROWERS: ", result);
                        }
                    }
                );
                // res.status(200).send(JSON.stringify(result));
            }
        }
    );
});

module.exports = router;
