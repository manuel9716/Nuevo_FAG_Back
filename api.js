const dbcategoria = require("./dbcategoria");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const request = require("superagent");
const dbactividadeconomica = require("./dbactividadeconomica");
const dbparametrocomision = require("./dbparametrocomision");
const dbdestino = require("./dbdestino");
const dbintermediario = require("./dbintermediariofinanciero");
const dbparametrogeneral = require("./dbparametrogeneral");


var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

//Categoria

router.route("/categoria").get((request, response)=>{
    dbcategoria.getCategoria().then(result =>{
        response.json(result[0]);
    })
})

//Actividad economica
router.route("/actividadeconomica").get((request, response)=>{
    dbactividadeconomica.getActividadEconomica().then(result =>{
        response.json(result[0]);
    })
})

//Parametro comision
router.route("/parametrocomision").get((request, response)=>{
    dbparametrocomision.getParametroComision().then(result =>{
        response.json(result[0]);
    })
})

//Parametro destino credito
router.route("/destinocredito").get((request, response)=>{
    dbdestino.getDestinoCredito().then(result =>{
        response.json(result[0]);
    })
})

//Parametro intermediario financiero
router.route("/intermediario").get((request, response)=>{
    dbintermediario.getIntermediarioFinanciero().then(result =>{
        response.json(result[0]);
    })
})

//Parametro parametro general
router.route("/paramgeneral").get((request, response)=>{
    dbparametrogeneral.getParametroGeneral().then(result =>{
        response.json(result[0]);
    })
})


//Presupuesto SQLSERVER
// app.use( require('./controllers/presupuesto.controller') );


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Nuevo FAG API iniciado en el puerto: ', + port);