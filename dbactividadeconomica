const dbConfig = require('./dbconfig');
var config = require('./dbconfig');
const sql = require("mssql");

async function getActividadEconomica() {
    try {
        let pool = await sql.connect(dbConfig);
        let actividad = await pool.request().query("SELECT *FROM TM_ACTIVIDADECONOMICA");
        return actividad.recordsets;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getActividadEconomica : getActividadEconomica
}