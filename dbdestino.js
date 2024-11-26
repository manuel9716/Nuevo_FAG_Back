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

async function insertDestinoCredito(
    nombreDestinoCredito,
    lineasCredito,
    lineasProduccion,
    fechaInicioVigencia,
    fechaFinVigencia,
    fechaActualizacion,
    moneda
) {
    try {
        let pool = await sql.connect(dbConfig);
        let insertQuery = `
            INSERT INTO TM_DESTINO (
                [Nombre Destino Crédito],
                [Lineas de crédito],
                [Lineas de producción],
                [Fecha inicio de vigencia],
                [Fecha fin de vigencia],
                [Fecha de Actualización],
                [Moneda]
            ) 
            VALUES (
                @nombreDestinoCredito,
                @lineasCredito,
                @lineasProduccion,
                @fechaInicioVigencia,
                @fechaFinVigencia,
                @fechaActualizacion,
                @moneda
            )
        `;

        let result = await pool.request()
            .input('nombreDestinoCredito', sql.VarChar, nombreDestinoCredito)
            .input('lineasCredito', sql.VarChar, lineasCredito)
            .input('lineasProduccion', sql.VarChar, lineasProduccion)
            .input('fechaInicioVigencia', sql.Date, fechaInicioVigencia)
            .input('fechaFinVigencia', sql.Date, fechaFinVigencia)
            .input('fechaActualizacion', sql.Date, fechaActualizacion)
            .input('moneda', sql.VarChar, moneda)
            .query(insertQuery);

        return result.rowsAffected; // Devuelve el número de filas afectadas
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getDestinoCredito : getDestinoCredito,
    insertDestinoCredito : insertDestinoCredito

}