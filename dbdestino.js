const dbConfig = require('./dbconfig');
var config = require('./dbconfig');
const sql = require("mssql");

async function getDestinoCredito() {
    try {
        let pool = await sql.connect(dbConfig);
        let destino = await pool.request().query("SELECT *FROM TM_DESTINO");
        return destino.recordsets;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getDestinoCredito : getDestinoCredito

}