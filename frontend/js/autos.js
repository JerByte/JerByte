const listaAutos = document.getElementById("lista-autos");
const propietario = document.getElementById("propietario");
const tipoMotor = document.getElementById("tipoMotor");
const indice = document.getElementById("indice");
const tipoMono = document.getElementById("tipoMono");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const url = "http://localhost:5000/autos";

let autos = [];


async function listarAutos() {
    try {
        const respuesta = await fetch(url); 
        const autosDelServer = await respuesta.json();
        if(Array.isArray(autosDelServer)){
            autos = autosDelServer
        }
        if(autos.length > 0) {
            const htmlAutos = autos
            .map(
                (auto, index)=>` <tr>
            <th scope="row">${index}</th>
            <td>${auto.propietario}</td>
            <td>${auto.tipoMotor}</td>
            <td>${auto.tipoMono}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>`)
        .join("");
        listaAutos.innerHTML = htmlAutos;
        Array.from(document.getElementsByClassName("editar")).forEach(
            (botonEditar, index)=>botonEditar.onclick = editar(index)
            ); //llamamos a la funcion pasandole el index 
        Array.from(document.getElementsByClassName("eliminar")).forEach(
            (botonEliminar, index)=>botonEliminar.onclick = eliminar(index)
            );
        return;
      }
      listaAutos.innerHTML = ` <tr>
      <td colspan="5" id="listaVacia">No hay monoplazas</td> 
  </tr>`; //si el length es mayor a cero se pone lo de arriba, si no se pone este mensaje
    } catch (error) {
      console.log({ error });
      $(".alert").show(); //esto va a hacer que solo se muestre la alerta en el caso de que hubiese un error
     }
    }

async function enviarDatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
            propietario: propietario.value,
            tipoMotor: tipoMotor.value,
            tipoMono: tipoMono.value,
        };
        let method = "POST";
        let urlEnvio = url;
        const accion = btnGuardar.innerHTML;
            if(accion === "Editar"){
                 method = "PUT";
                 autos[indice.value] = datos;
                 urlEnvio = `${url}/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos), 
          });
          if(respuesta.ok){
            listarAutos();
            resetModal();    
          }
    } catch (error) {
        throw error;
        /*console.log({ error });
        $(".alert").show();*/
    }
  }
    
   

function editar(index) {
    return function cuandoCliqueo() {
           btnGuardar.innerHTML = "Editar"
        $("#exampleModal").modal("toggle")
        const auto = autos[index];
        propietario.value = auto.propietario;
        tipoMotor.value = auto.tipoMotor;
        tipoMono.value =  auto.tipoMono;
        indice.value = index;

    }
}

function resetModal() {
    propietario.value = "";
    tipoMotor.value = "";
    tipoMono.value =  "";
    indice.value = "";
    btnGuardar.innerHTML = "Guardar datos";
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar () {
        try {
            const respuesta = await fetch(urlEnvio, {
                method : "DELETE",
              });
              if(respuesta.ok){
                listarAutos();
                resetModal();    
              }
        } catch (error) {
            throw error;
        } 
    };
}

listarAutos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;

