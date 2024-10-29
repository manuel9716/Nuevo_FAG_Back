const dbConfig = require('./dbconfig');
var config = require('./dbconfig');
const sql = require("mssql");

async function getParametroGeneral() {
    try {
        let pool = await sql.connect(dbConfig);
        let parametrogeneral = await pool.request().query("SELECT *FROM TM_PARAMETROGENERAL");
        return parametrogeneral.recordsets;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getParametroGeneral : getParametroGeneral

}