const dbcategoria = require("./dbcategoria");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const request = require("superagent");
const dbactividadeconomica = require("./dbactividadeconomica");
const dbparametrocomision = require("./dbparametrocomision");
const dbdestino = require("./dbdestino"); // Archivo que contiene insertDestinoCredito
const dbintermediario = require("./dbintermediariofinanciero");
const dbparametrogeneral = require("./dbparametrogeneral");

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
app.use((req, res, next) => {
    console.log(`Solicitud entrante: ${req.method} ${req.url}`);
    next();
});

// Categoria
router.route("/categoria").get((request, response) => {
    dbcategoria.getCategoria().then(result => {
        response.json(result[0]);
    });
});

// Actividad económica
router.route("/actividadeconomica").get((request, response) => {
    console.log("entro1");
    dbactividadeconomica.getActividadEconomica().then(result => {
        response.json(result[0]);
        console.log("entro2");
    });
});


// Ruta POST para insertar un destino de crédito
router.route("/actividadeconomica").post((request, response) => {
    console.log("entro api");
    const {
        CodigoActividadeconomica,
        NombreActividadeconómica,
        Descripcion,
        Fechainiciovigencia,
        Fechafinvigencia
    } = request.body;

    // Validar que todos los campos requeridos estén presentes
    if (!CodigoActividadeconomica || !NombreActividadeconómica || !Descripcion || !Fechainiciovigencia || !Fechafinvigencia) {
        return response.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    dbactividadeconomica.insertActividadEconomica(
        CodigoActividadeconomica,
        NombreActividadeconómica,
        Descripcion,
        Fechainiciovigencia,
        Fechafinvigencia
    ).then(result => {
        if (result > 0) {
            response.status(201).json({ message: "Actividad economica insertada correctamente." });
        } else {
            response.status(400).json({ message: "No se pudo insertar la actividad economica" });
        }
    }).catch(error => {
        response.status(500).json({ error: error.message });
    });
});


// Parámetro comisión
router.route("/parametrocomision").get((request, response) => {
    dbparametrocomision.getParametroComision().then(result => {
        response.json(result[0]);
    });
});

// Destino de crédito
// Ruta GET para obtener los destinos de crédito
router.route("/destinocredito").get((request, response) => {
    dbdestino.getDestinoCredito().then(result => {
        response.json(result[0]);
    }).catch(error => {
        response.status(500).json({ error: error.message });
    });
});

// Ruta POST para insertar un destino de crédito
router.route("/destinocredito").post((request, response) => {
    const {
        nombreDestinoCredito,
        lineasCredito,
        lineasProduccion,
        fechaInicioVigencia,
        fechaFinVigencia,
        fechaActualizacion,
        moneda
    } = request.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombreDestinoCredito || !lineasCredito || !lineasProduccion || !fechaInicioVigencia || !fechaFinVigencia || !fechaActualizacion || !moneda) {
        return response.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    dbdestino.insertDestinoCredito(
        nombreDestinoCredito,
        lineasCredito,
        lineasProduccion,
        fechaInicioVigencia,
        fechaFinVigencia,
        fechaActualizacion,
        moneda
    ).then(result => {
        if (result > 0) {
            response.status(201).json({ message: "Destino de crédito insertado correctamente." });
        } else {
            response.status(400).json({ message: "No se pudo insertar el destino de crédito." });
        }
    }).catch(error => {
        response.status(500).json({ error: error.message });
    });
});

// Intermediario financiero
router.route("/intermediario").get((request, response) => {
    dbintermediario.getIntermediarioFinanciero().then(result => {
        response.json(result[0]);
    });
});

// Parámetro general
router.route("/paramgeneral").get((request, response) => {
    dbparametrogeneral.getParametroGeneral().then(result => {
        response.json(result[0]);
    });
});

// Ruta POST para insertar un destino de crédito
router.route("/paramgeneral").post((request, response) => {
    const {
        NombredeParametro,
        Valor,
        Descripcion,
        Codigo
    } = request.body;

    // Validar que todos los campos requeridos estén presentes
    if (!NombredeParametro || !Valor || !Descripcion || !Codigo) {
        return response.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    dbparametrogeneral.insertParametroGeneral(
        NombredeParametro,
        Valor,
        Descripcion,
        Codigo
    ).then(result => {
        if (result > 0) {
            response.status(201).json({ message: "Parametro general insertado correctamente." });
        } else {
            response.status(400).json({ message: "No se pudo insertar el parametro general." });
        }
    }).catch(error => {
        response.status(500).json({ error: error.message });
    });
});

// Presupuesto SQLSERVER
// app.use(require('./controllers/presupuesto.controller'));

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Nuevo FAG API iniciado en el puerto: ', port);
