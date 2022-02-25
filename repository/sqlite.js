const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/metrics.db', (err) => {
    if (err) {
        console.log(err.message)
    }

    console.log("Me conecte con la base de datos", __dirname + '/metrics.db')
});
exports.closeDB = async (db) => {
    db.close((err) => {
        if (err) {
            console.log(error.message)
        }
        console.log("Conexion terminada correctamente")
    })
}
exports.insertData = async (uuid, memory, hostname) => {
    db.each("SELECT * FROM metricas;", function (err, row) {
    });
    db.run(`INSERT into metricas(uuid, memory, hostname, datetime) VALUES ("${uuid}", ${memory}, "${hostname}", ${Date.now()})`, (err) => {
        if (err) console.log(err)
        console.log('se han insertado los datos ', uuid, memory, hostname, Date.now())
    });
}
