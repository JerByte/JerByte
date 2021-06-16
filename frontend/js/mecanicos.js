const listaMecanicos = document.getElementById("lista-mecanicos");
const pais = document.getElementById("pais");
const indice = document.getElementById("indice");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const url = "http://localhost:5000/mecanicos";

let mecanicos = [];


async function listarMecanicos() {
    try {
        const respuesta = await   fetch(url); 
        const mecanicosDelServer = await respuesta.json();
            if(Array.isArray(mecanicosDelServer)){
                mecanicos = mecanicosDelServer
            }
            if(mecanicos.length > 0){
            const htmlMecanicos = mecanicos.map((mecanico, index)=>` <tr>
            <th scope="row">${index}</th>
            <td>${mecanico.nombre}</td>
            <td>${mecanico.apellido}</td>
            <td>${mecanico.pais}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
               </div>
            </td>
        </tr>`).join("");
        listaMecanicos.innerHTML = htmlMecanicos;
        Array.from(document.getElementsByClassName("editar"))
        .forEach((botonEditar, index)=>botonEditar.onclick = editar(index)); //llamamos a la funcion pasandole el index 
        Array.from(document.getElementsByClassName("eliminar"))
        .forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index)); 
        return;
           }
           listaMecanicos.innerHTML = ` <tr>
           <td colspan="5" id="listaVacia">No hay mecanicos</td> 
       </tr>`;
    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
   
    }

async function enviarDatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            pais: pais.value,
        };
        const accion = btnGuardar.innerHTML;
        let urlEnvio = url;
        let method = "POST"
        if(accion == "Editar") {
            urlEnvio += `/${indice.value}`;
            method = "PUT";
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos), 
            mode: "cors",
          });
          if(respuesta.ok){
            listarMecanicos();
            resetModal();    
          }
    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
}

function editar(index) {
    return function cuandoCliqueo() {
           btnGuardar.innerHTML = "Editar"
        $("#exampleModal").modal("toggle")
        const mecanico = mecanicos[index];
        nombre.value = mecanico.nombre;
        apellido.value = mecanico.apellido;
        pais.value =  mecanico.pais;
        indice.value = index;

    }
}

function resetModal() {
    indice.value = "";
    nombre.value = "";
    apellido.value = "";
    pais.value =  "";
    btnGuardar.innerHTML = "Guardar datos";
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar () {
      try {
        const respuesta = await fetch(urlEnvio, {
            method: "DELETE",
          })
          if(respuesta.ok){
            listarMecanicos();
          } 
      } catch (error) {
        console.log({ error });
        $(".alert").show();
      }
     }
};

listarMecanicos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;