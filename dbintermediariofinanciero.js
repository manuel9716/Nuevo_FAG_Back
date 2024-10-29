const dbConfig = require('./dbconfig');
var config = require('./dbconfig');
const sql = require("mssql");

async function getIntermediarioFinanciero() {
    try {
        let pool = await sql.connect(dbConfig);
        let intermediario = await pool.request().query("SELECT *FROM TM_INTERMEDIARIO");
        return intermediario.recordsets;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getIntermediarioFinanciero : getIntermediarioFinanciero

}