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

async function insertParametroGeneral(
    NombredeParametro,
    Valor,
    Descripcion,
    Codigo
) {
    try {
        let pool = await sql.connect(dbConfig);
        let insertQuery = `
            INSERT INTO TM_PARAMETROGENERAL (
                [Nombre de  Parámetro],
                [Valor],
                [Descripción],
                [Código]
            ) 
            VALUES (
                @NombredeParametro,
                @Valor,
                @Descripcion,
                @Codigo
            )
        `;

        let result = await pool.request()
            .input('NombredeParametro', sql.VarChar, NombredeParametro)
            .input('Valor', sql.VarChar, Valor)
            .input('Descripcion', sql.VarChar, Descripcion)
            .input('Codigo', sql.Date, Codigo)
            .query(insertQuery);

        return result.rowsAffected; // Devuelve el número de filas afectadas
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getParametroGeneral : getParametroGeneral,
    insertParametroGeneral : insertParametroGeneral 

}