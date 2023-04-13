window.onload = lanzadera()
function lanzadera(){
    ObtenerRegiones();
    ObtenerPaises();
    ObtenerCiudades();
    Region();
}

const RegionesNombres = document.getElementById('RegionesNombres');
const NombrePaises = document.getElementById('NombrePaises');
const NombreCiudades = document.getElementById('NombreCiudades');
const deleteRegionbt = document.getElementById('deleteRegionbt');
const DeletePaisbt = document.getElementById('DeletePaisbt');
const DeleteCiudadbt = document.getElementById('DeleteCiudadbt');
const AgregarRegionbtn = document.getElementById('AgregarRegionbtn');
const AgregarPaisbt = document.getElementById('AgregarPaisbt');
const AgregarCiudadBt = document.getElementById('AgregarCiudadBt');
const EditarRegionbt = document.getElementById("EditarRegionbt");
const EditarBtPais = document.getElementById("EditarBtPais");
const EditarCiudadbt = document.getElementById("EditarCiudadbt");


// GET A REGIONES

async function ObtenerRegiones() {
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const Regiones = await fetch("https://datawarehouse.onrender.com/api/region",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
          }
    });
    const response = await Regiones.json()
    RegionesNombres.innerHTML = "";
    response.forEach(region => {
    RegionesNombres.innerHTML += `  <tbody id="RegionesNombres">
    <tr>
      <td>${region.nombre_region}</td>
      <td>
            <div class="btndelete" > <a
                id="${region.id}" class="Editar waves-effect waves-light btn modal-trigger btn btn-outline-dark btn-small id"
                href="#EditarRegion">Editar</a>
              <a href="#deleteRegion" class="modal-trigger"><i class="material-icons closecompania" id="${region.id}"
                  style="cursor: pointer;">close</i></a>
          </td>
    </tr>
  </tbody>`
    });

    document.querySelectorAll('.closecompania').forEach(id => {
        id.addEventListener('click', EliminarRegion)
    });
    document.querySelectorAll('.Editar').forEach(id2 => {
        id2.addEventListener('click', IdParaAtualizar)
    });
}


// GET A PAISES

async function ObtenerPaises() {
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const Paises = await fetch("https://datawarehouse.onrender.com/api/region/pais", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
    });
    const response = await Paises.json();
    console.log(response);
    NombrePaises.innerHTML = "";
    response.forEach(Pais => {
        NombrePaises.innerHTML += `    <tbody id="NombrePaises">
        <tr>
          <td>${Pais.nombre_region}</td>
          <td>${Pais.nombre_pais}</td>
          <td>
            <div class="btndelete" > <a
                id="${Pais.id}" data-num="${Pais.region_id}" class=" EditarPais waves-effect waves-light btn modal-trigger btn btn-outline-dark btn-small id"
                href="#EditarPais">Editar</a>
              <a href="#deletepais" class="modal-trigger"><i class="material-icons closecompania" id="${Pais.id}"
                  style="cursor: pointer;">close</i></a>
          </td>
        </tr>
      </tbody>`
    });
    document.querySelectorAll('.closecompania').forEach(id => {
        id.addEventListener('click', EliminarPais)
    });
    document.querySelectorAll('.EditarPais').forEach(id => {
        id.addEventListener('click', IdParaAtualizarPais)
    });
}

// GET A CIUDADES

async function ObtenerCiudades() {
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const Paises = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
    });
    const response = await Paises.json();
    NombreCiudades.innerHTML = "";
    console.log(response)
    response.forEach(Ciudad => {
        NombreCiudades.innerHTML += `  <tbody id="NombreCiudades">
        <tr>
          <td>${Ciudad.nombre_region}</td>
          <td>${Ciudad.nombre_pais}</td>
          <td>${Ciudad.nombre_ciudad}</td>
          <td>
            <div class="btndelete" > <a
                id="${Ciudad.id}" data-num="${Ciudad.pais_id}" class="waves-effect EditarCiudad waves-light btn modal-trigger btn btn-outline-dark btn-small id"
                href="#EditarCiudad">Editar</a>
              <a href="#deleteCiudad" class="modal-trigger"><i class="material-icons closecompania" id="${Ciudad.id}"
                  style="cursor: pointer;">close</i></a>
          </td>
        </tr>
      </tbody> `
    });
    document.querySelectorAll('.closecompania').forEach(id => {
        
        id.addEventListener('click', EliminarCiudad)
    });
    document.querySelectorAll('.EditarCiudad').forEach(id => {
        id.addEventListener('click', IdParaAtualizarCiudad)
    });
}


// ELIMINAR REGIONES


async function EliminarRegion(id) {
    console.log(id);
    if (id) {
        deleteRegionbt.addEventListener('click', async () => {
            console.log(id.target.id);
            const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
            const EliminarRegion = await fetch("https://datawarehouse.onrender.com/api/region?id=" + `${id.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': bearer
                }
            })
            const res = await EliminarRegion.json();
            ObtenerRegiones();
            ObtenerCiudades();
            ObtenerPaises();
        })
    }

}
// ELIMINAR PAIS


async function EliminarPais(id) {
    console.log(id);
    if (id) {
        DeletePaisbt.addEventListener('click', async () => {
            console.log(id.target.id);
            const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
            const EliminarPais = await fetch("https://datawarehouse.onrender.com/api/region/pais?id=" + `${id.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': bearer
                }
            })
            const res = await EliminarPais.json();
            ObtenerRegiones();
            ObtenerCiudades();
            ObtenerPaises();
        })
    }

}
// ELIMINAR CIUDAD


async function EliminarCiudad(id) {
    console.log(id);
    if (id) {
        DeleteCiudadbt.addEventListener('click', async () => {
            console.log(id.target.id);
            const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
            const EliminarCiudad = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad?id=" + `${id.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': bearer
                }
            })
            const res = await EliminarCiudad.json();
            ObtenerRegiones();
            ObtenerCiudades();
            ObtenerPaises();
        })
    }

}

//AGREGAR REGION

AgregarRegionbtn.addEventListener("click", async (e) => {
    e.preventDefault();    
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const NombreRegion = document.getElementById('NombreRegion').value;
    let data = {
        "nombre_region": NombreRegion
    }
    const CrearRegion = await fetch("https://datawarehouse.onrender.com/api/region", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        },
        body: JSON.stringify(data)
    })
    const response = await CrearRegion.json();
    ObtenerRegiones();
    ObtenerCiudades();
    ObtenerPaises();
    Region();
})
//AGREGAR PAIS

AgregarPaisbt.addEventListener("click", AgregarPais)

    async function AgregarPais(e){
    
    e.preventDefault();    
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const NombrePais = document.getElementById('NombrePais').value;
    let data = {
        "region_id": SelectRegion.value,
        "nombre_pais": NombrePais
    }
    const CrearPais = await fetch("https://datawarehouse.onrender.com/api/region/pais", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        },
        body: JSON.stringify(data)
    })
    const response = await CrearPais.json();
    ObtenerRegiones();
    ObtenerCiudades();
    ObtenerPaises();
    Pais()
    
}
    // GET A REGIONES PARA CREAR PAIS

const SelectRegion = document.getElementById('SelectRegion');
const SelectRegion2 = document.getElementById('SelectRegion2');

async function Region() {
  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const ObtenerRegion = await fetch("https://datawarehouse.onrender.com/api/region", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  })
  const responses = await ObtenerRegion.json();

  SelectRegion.innerHTML = `<option value="" disabled selected>Seleccionar una region</option>`;
  SelectRegion2.innerHTML = `<option value="" disabled selected>Seleccionar una region</option>`;
  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];
    SelectRegion.innerHTML += `<option class="Region" value="${element.id}">${element.nombre_region}</option>`;
    SelectRegion2.innerHTML += `<option class="Region" value="${element.id}">${element.nombre_region}</option>`
  }

}

const seleccionaRegion = document.querySelector(".seleccionaRegion")
const Selectpais = document.getElementById('Selectpais');

seleccionaRegion.addEventListener('change', Pais)
async function Pais() {
  seleccionarciudad.disabled = false;
  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const ObtenerPaises = await fetch("https://datawarehouse.onrender.com/api/region/pais/region_pais?id=" + `${seleccionaRegion.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  })
  const responses = await ObtenerPaises.json();
  console.log(responses);
  Selectpais.innerHTML = `<option value="" disabled selected>Seleccionar un Pais</option>`
  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];
    Selectpais.innerHTML += `<option value="${element.id}">${element.nombre_pais}</option>`
  }
}

// CREAR CIUDAD

AgregarCiudadBt.addEventListener("click", AgregarCiudad)

async function AgregarCiudad(){
    
    console.log(Selectpais.value);
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const NombreCiudad = document.getElementById('NombreCiudad').value;
    let data = {
        "pais_id": Selectpais.value,
        "nombre_ciudad": NombreCiudad
    }
    const CrearCiudad = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        },
        body: JSON.stringify(data)
    })
    const response = await CrearCiudad.json();
    ObtenerRegiones();
    ObtenerCiudades();
    ObtenerPaises();
    
}

// EDITAR REGION



function IdParaAtualizar(id2) {
    EditarRegionbt.addEventListener('click', BtnactualizarRegion)
    async function BtnactualizarRegion() {
        console.log(id2.target.id);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const NuevoNombreRegion = document.getElementById('NuevoNombreRegion').value;

        const data = {
            "nombre_region": NuevoNombreRegion,
        }

        const EditarRegion = await fetch("https://datawarehouse.onrender.com/api/region?id=" + `${id2.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            },
            body: JSON.stringify(data)
        })

        const response = await EditarRegion.json();
        ObtenerRegiones();
    ObtenerCiudades();
    ObtenerPaises();
    Region();
    location.reload();
    }
}


// EDITAR PAIS



function IdParaAtualizarPais(id) {
    EditarBtPais.addEventListener('click', BtnactualizarPais)
    async function BtnactualizarPais() {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const NuevoNombrePais = document.getElementById('NuevoNombrePais').value;

        const data = {
            "region_id": id.target.dataset.num,
            "nombre_pais": NuevoNombrePais
        }

        const EditarRegion = await fetch("https://datawarehouse.onrender.com/api/region/pais?id=" + `${id.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            },
            body: JSON.stringify(data)
        })

        const response = await EditarRegion.json();
        ObtenerRegiones();
        ObtenerCiudades();
        ObtenerPaises();
        Region();
        location.reload();
    }
}


// EDITAR CIUDAD



function IdParaAtualizarCiudad(id) {
    EditarCiudadbt.addEventListener('click', BtnactualizarCiudad)
    async function BtnactualizarCiudad() {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const NuevoNombreCiudad = document.getElementById('NuevoNombreCiudad').value;

        const data = {
            "pais_id": id.target.dataset.num,
            "nombre_ciudad": NuevoNombreCiudad
        }

        const EditarCiudad = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad?id=" + `${id.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            },
            body: JSON.stringify(data)
        })

        const response = await EditarCiudad.json();
        ObtenerRegiones();
        ObtenerCiudades();
        ObtenerPaises();
        Region();
        location.reload();
    }
}