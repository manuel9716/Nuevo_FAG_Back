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


async function insertActividadEconomica( 
    CodigoActividadeconomica,
    NombreActividadeconómica,
    Descripcion,
    Fechainiciovigencia,
    Fechafinvigencia
) {
    console.log("entro3");
    try {
        console.log("entro4");
        let pool = await sql.connect(dbConfig);
        let insertQuery = `
            INSERT INTO TM_ACTIVIDADECONOMICA (
                [CódigoActividadeconómica],
                [NombreActividadeconómica],
                [Descripción],
                [Fechainiciovigencia],
                [Fechafinvigencia],
            ) 
            VALUES (
                @CodigoActividadeconomica,
                @NombreActividadeconómica,
                @Descripcion,
                @Fechainiciovigencia,
                @Fechafinvigencia
            )
        `;

        let result = await pool.request()
            .input('CodigoActividadeconomica', sql.VarChar, CodigoActividadeconomica)
            .input('NombreActividadeconómica', sql.VarChar, NombreActividadeconómica)
            .input('Descripcion', sql.VarChar, Descripcion)
            .input('Fechainiciovigencia', sql.Date, Fechainiciovigencia)
            .input('Fechafinvigencia', sql.Date, Fechafinvigencia)
            .query(insertQuery);

        return result.rowsAffected; // Devuelve el número de filas afectadas
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getActividadEconomica : getActividadEconomica,
    insertActividadEconomica : insertActividadEconomica
}