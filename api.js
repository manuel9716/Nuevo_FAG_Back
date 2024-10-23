const dbcategoria = require("./dbcategoria");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const request = require("superagent");
const dbactividadeconomica = require("./dbactividadeconomica");

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.route("/categoria").get((request, response)=>{
    dbcategoria.getCategoria().then(result =>{
        response.json(result[0]);
    })
})

router.route("/actividadeconomica").get((request, response)=>{
    dbactividadeconomica.getActividadEconomica().then(result =>{
        response.json(result[0]);
    })
})
//Presupuesto SQLSERVER
// app.use( require('./controllers/presupuesto.controller') );


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Nuevo FAG API iniciado en el puerto: ', + port);