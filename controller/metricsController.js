var express = require("express")
var app = express()
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:/Users/CherryBlossom/Documents/toctoc/react project/metrics_backend/repository/metrics.db', (err) => {
    if (err) {
        console.log(err.message)
    }

    console.log("Me conecte con la base de datos", __dirname + '/metrics.db')
});

router.get("/data", (req, res, next) => {
    let sql = "select * from metricas"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

module.exports = router;