module.exports = {
    autos: [
        {propietario:"Usuario1", tipoMotor:"V8", tipoMono:"F1"},
        {propietario:"Usuario2", tipoMotor:"V8", tipoMono:"F1"},
        {propietario:"Usuario3", tipoMotor:"V8", tipoMono:"F1"},
        {propietario:"Usuario4", tipoMotor:"V8", tipoMono:"F1"}  
    ],
    mecanicos: [
        {nombre:"Lautaro", apellido:"si", pais:"Canada" },
        {nombre:"jeremias", apellido:"Perez", pais:"Mexico" },
        {nombre:"Pepe", apellido:"Hamilton", pais:"UK" },
        {nombre:"jose", apellido:"Verstappen", pais:"Holanda" }
    ],
    propietarios: [
        {nombre:"jeremias", apellido:"Perez", pais:"Mexico" },
        {nombre:"jose", apellido:"Verstappen", pais:"Holanda" }, 
        {nombre:"Lautaro", apellido:"Rousseau", pais:"Canada" }, 
        {nombre:"Pepe", apellido:"Hamilton", pais:"UK" },
    ],
    consultas: [
        {
        auto: 0, 
        mecanico: 0, 
        fechaCreacion: new Date(), 
        fechaEdicion: new Date(), 
        historia:"si", 
        diagnostico:"diagnostico",
        },
        {
            auto: 2, 
            mecanico: 2, 
            fechaCreacion: new Date(), 
            fechaEdicion: new Date(), 
            historia:"ghj", 
            diagnostico:"diagnostico",
            },
    ],
};