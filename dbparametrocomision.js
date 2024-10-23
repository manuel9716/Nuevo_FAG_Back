const dbConfig = require('./dbconfig');
var config = require('./dbconfig');
const sql = require("mssql");

async function getParametroComision() {
    try {
        let pool = await sql.connect(dbConfig);
        let comision = await pool.request().query("SELECT *FROM TM_ADMPARCOMISION");
        return comision.recordsets;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getParametroComision : getParametroComision
}