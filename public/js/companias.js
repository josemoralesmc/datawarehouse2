window.onload = lanzadera3()
function lanzadera3(){
    Compañias();
    getciudad2()
    getciudad();
}


//Cambio de seccion

const sectionRegion = document.getElementById('sectionRegion');
const UsuariosSection = document.getElementById('SectionUsuarios');
const SectionCompanias = document.getElementById('SectionCompanias')
const SectionContactos = document.getElementById('SectionContactos');
const btnContactos = document.getElementById('btnContactos');
const btnCompanias = document.getElementById('btnCompanias');
const btnUsuarios = document.getElementById('btnUsuarios');
const btnRegion = document.getElementById('btnRegion');
const FormUsuarios = document.getElementById('FormUsuarios');
const BotonUsuario = document.getElementById('BotonUsuario')
const tbody = document.getElementById('tbody');
const deletecompañia2 = document.getElementById('deletecompañia2');
const crearcompaniabt = document.getElementById('crearcompaniabt');
const seleccionarciudad = document.getElementById('seleccionarciudad');



document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});




btnContactos.addEventListener('click', () => {
    if (SectionContactos.style.display = 'none') {
        SectionContactos.style.display = 'block';
        UsuariosSection.style.display = 'none';
        SectionCompanias.style.display = 'none';
        sectionRegion.style.display = 'none';
    } else {
        SectionContactos.style.display = 'none'
    }
});

btnUsuarios.addEventListener('click', () => {
    if (UsuariosSection.style.display = 'none') {
        UsuariosSection.style.display = 'block';
        SectionContactos.style.display = 'none';
        SectionCompanias.style.display = 'none';
        sectionRegion.style.display = 'none';
    } else {
        UsuariosSection.style.display = 'none'
    }
});
btnCompanias.addEventListener('click', () => {
    if (SectionCompanias.style.display = 'block') {
        SectionCompanias.style.display = 'block';
        SectionContactos.style.display = 'none';
        UsuariosSection.style.display = 'none';
        sectionRegion.style.display = 'none';
    } else {
        SectionCompanias.style.display = 'none'
    }
})
btnRegion.addEventListener('click', () => {
    if (sectionRegion.style.display = 'none') {
        sectionRegion.style.display = 'block';
        UsuariosSection.style.display = 'none';
        SectionCompanias.style.display = 'none';
        SectionContactos.style.display = 'none';
    } else {
        sectionRegion.style.display = 'none';
    }
});



// GET A COMPAÑIAS

async function Compañias() {
    const SelectNC = document.getElementById('SelectNC');
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const mostrarCompañias = await fetch("https://datawarehouse.onrender.com/api/compania", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
    });
    const response = await mostrarCompañias.json();
    tbody.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
        const element = response[index];
        tbody.innerHTML += `<tbody id="tbody">
        <tr>
          <th scope="row">${element.nombre_compania}</th>
          <td>${element.direccion}</td>
          <td>${element.email}</td>
          <td>${element.telefono}</td>
          <td>${element.nombre_ciudad}</td>
          <td>
            <div class="btndelete" > <a
                id="${element.id}" class="waves-effect waves-light btn modal-trigger btn btn-outline-dark btn-small id"
                href="#modalA">Editar</a>
              <a href="#deletecompañia" class="modal-trigger"><i class="material-icons closecompania" id="${element.id}"
                  style="cursor: pointer;">close</i></a>
          </td>
  </div>
  </tr>
  </tbody>`;
    }




    document.querySelectorAll('.id').forEach(id2 => {
        id2.addEventListener('click', Act)
    });
    document.querySelectorAll('.closecompania').forEach(id => {
        id.addEventListener('click', EliminarCompañia)
    });
}


console.log(Compañias());

// POST A COMPAÑIAS
crearcompaniabt.addEventListener('click', CrearCompania)

async function CrearCompania(e) {
    e.preventDefault();
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const nombreCompania = document.getElementById('nombreCompania').value;
    const telefonocompania = document.getElementById('telefonocompania').value;
    const direccioncompania = document.getElementById('direccioncompania').value;
    const emailcompania = document.getElementById('emailcompania').value;
    const selectcompania = document.getElementById('selectcompania').value;
    console.log(selectcompania)

    const data = {
        "nombre_compania": nombreCompania,
        "direccion": direccioncompania,
        "email": emailcompania,
        "telefono": telefonocompania,
        "ciudad_id": selectcompania
    }
    const crearcompania = await fetch("https://datawarehouse.onrender.com/api/compania", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        },
        body: JSON.stringify(data)
    })
    const response = await crearcompania.json();
    Compañias();
}

// PUT A COMPAÑIAS

const Actualizarcompania = document.getElementById("Actualizarcompania");

function Act(id2) {
    Actualizarcompania.addEventListener('click', Btnactualizar)
    async function Btnactualizar() {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const Actualizarnombre = document.getElementById('Actualizarnombre').value;
        const Actualizartelefono = document.getElementById('Actualizartelefono').value;
        const Actualizardireccion = document.getElementById('Actualizardireccion').value;
        const Actualizarmail = document.getElementById('Actualizarmail').value;
        const selectcompania2 = document.getElementById('selectcompania2').value;

        const data = {
            "nombre_compania": Actualizarnombre,
            "direccion": Actualizardireccion,
            "email": Actualizarmail,
            "telefono": Actualizartelefono,
            "ciudad_id": selectcompania2
        }

        const crearcompania = await fetch("https://datawarehouse.onrender.com/api/compania?id=" + `${id2.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            },
            body: JSON.stringify(data)
        })

        const response = await crearcompania.json();
        Compañias();
        location.reload();
        document.getElementById("miForm").reset();
    }
}


// GET A COMPAÑIAS (SELECCIONAR CIUDAD)


async function getciudad() {
    const selectcompania = document.getElementById('selectcompania');
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const traerciudad = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
    });
    const response = await traerciudad.json();

    selectcompania.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
        const element = response[index];

        selectcompania.innerHTML += `
           <option class="value" id="${element.id}" value="${element.id}">${element.nombre_ciudad}</option>
         
    `;
    }
}

console.log(getciudad());
async function getciudad2() {
    const selectcompania2 = document.getElementById('selectcompania2');
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const traerciudad = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        }
    });
    const response = await traerciudad.json();

    selectcompania2.innerHTML = "";
    for (let index = 0; index < response.length; index++) {
        const element = response[index];

        selectcompania2.innerHTML += `
           <option class="value" id="${element.id}" value="${element.id}">${element.nombre_ciudad}</option>
         
    `;
    }
}

console.log(getciudad2());

// DELETE A COMPAÑIAS




async function EliminarCompañia(id) {
    if (id) {
        deletecompañia2.addEventListener('click', async () => {
            console.log(id.target.id);
            const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
            const EliminarC = await fetch("https://datawarehouse.onrender.com/api/compania?id=" + `${id.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': bearer
                }
            })
            const res = await EliminarC.json();
            Compañias();
        })
    }

}