const recursos = require("./recursos");
const autos = require("./rutas/autos");
const mecanicos = require("./rutas/mecanicos");
const propietarios = require("./rutas/propietarios");
const consultas = require("./rutas/consultas");

module.exports = {
    ruta: (data, callback) => { //creamos la ruta y el handler(es el manejador de la ruta)
        callback(200, {mensaje: "esta es /ruta"});
    },
    autos: autos(recursos.autos), //ejecutamos la funcion de autos, ejecutando recursos
    mecanicos: mecanicos(recursos.mecanicos),
    propietarios: propietarios(recursos.propietarios), 
    consultas: consultas(recursos), 
    noEncontrado: (data, callback) => {
        callback (404, { mensaje: "no encontrado" });
    },
};