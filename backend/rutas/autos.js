|module.exports =  function autosHandler(autos){
    return {
        get: (data, callback) => { //creamos la ruta y el handler(es el manejador de la ruta)
            if(typeof data.indice !== "undefined"){
                console.log("handler autos",{data});
                if(autos[data.indice]) { 
                    return callback(200, autos[data.indice]);
                }
                return callback(404, {
                    mensaje: `Monoplaza de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(200, autos); //si se envia este callback significa que se encontro el monoplaza
        },
        post: (data, callback) => { 
            autos.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => { //recordar que metodo put se utiliza para editar elementos ya existentes
            if(typeof data.indice !== "undefined"){ //si el indice  es diferente a undefined si entra al if
                if(autos[data.indice]) { 
                    autos[data.indice] = data.payload;
                    return callback(200, autos[data.indice]);
                }
                return callback(404, {
                    mensaje: `Monoplaza de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(400, {mensaje: "indice no enviado"}); //si se envia este callback significa que se encontro el monoplaza
        },
        delete:(data, callback) => { //recordar que metodo put se utiliza para editar elementos ya existentes
            if (typeof data.indice !== "undefined"){ //si el indice  es diferente a undefined si entra al if
                if(autos[data.indice]) { 
                    autos = autos.filter( //va a ser igual al mismo array verificando todos los elementos
                        (_auto, indice)=> indice != data.indice
                        ); //no debemos poner doble = para que no diferencie entre tipo de elemento
                    return callback(204, {mensaje: `elmento con ${data.indice} eliminado`});
                }
                return callback(404, {
                    mensaje: `Monoplaza de indice ${data.indice} no encontrado`,
                }); //ponemos este collback pera que no llegue a la linea de abajo
            }
            callback(400, {mensaje: "indice no enviado"}); //si se envia este callback significa que se encontro el monoplaza
            },
        };
    }




   