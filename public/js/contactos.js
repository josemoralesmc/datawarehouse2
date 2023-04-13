window.onload = lanzadera2()
function lanzadera2(){
  Contactos();
  compañias();
  Paises();
}

let array_id = []
let valuecompania = document.getElementById('valuecompania')
const Checklist = document.getElementById('Checklist');
const eliminarcheck = document.getElementById('eliminarcheck');
const EliminarContacto = document.getElementById('EliminarContacto');
const SearchClick = document.getElementById('SearchClick');


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const tablacontactos = document.getElementById("tablacontactos")

// Obtener todos los contactos

async function Contactos() {
  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const MostarContactos = await fetch("https://datawarehouse.onrender.com/api/contactos", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  });
  const response = await MostarContactos.json();
  tablacontactos.innerHTML = "";
  for (let index = 0; index < response.length; index++) {
    const element = response[index];
    tablacontactos.innerHTML += ` <tbody id="tablacontactos">
        <tr>
          <th scope="row" class="check">
            <p style="margin: 0;">
              <label>
                <input class="input" id="${element.id}" type="checkbox" />
                <span></span>
              </label>
            </p>
          </th>
          <th scope="row" id="nombres">${element.nombre_contacto} ${element.apellido_contacto} 
                 <h6 class="email"> ${element.email_contacto} </h6>
          </th>
          <td>${element.nombre_ciudad}, ${element.nombre_pais}</td>
          <td>${element.nombre_compania}</td>
          <td>${element.cargo_contacto}</td>
          <td>${element.interes_contacto}%</td>
       
          <td class="btndelete"><a href="#EditarContacto" id="${element.id}" class="btn modal-trigger btn-small Editar">Editar</a>
            <a href="#modaldelete" class="modal-trigger Eliminar"><i class="material-icons" id="${element.id}"
                style="cursor: pointer;">close</i></a>
          </td>
      </tbody>`

    }
    
    
    document.querySelectorAll('.Eliminar').forEach(id => {
      id.addEventListener('click', EliminarContactoID)
  });
    document.querySelectorAll('.Editar').forEach(id => {
      id.addEventListener('click', EditarContactoID)
  });
  
    //Seleccionar Contactos
  
  document.querySelectorAll('.input').forEach(idinput => {
    idinput.addEventListener('click', (idinput) => {
        if (array_id.indexOf(idinput.target.id) > -1) {
          let indice = array_id.indexOf(idinput.target.id);
          array_id.splice(indice, 1);
          valuecompania.innerText = array_id.length + " seleccionados"
          console.log(array_id);
          if (array_id.length === 0) {
            Checklist.style.display = 'none'
          }
        } else {
          Checklist.style.display = 'flex';
          array_id.push(idinput.target.id);
          let unique = array_id.filter(onlyUnique);
          console.info(unique)
          valuecompania.innerText = unique.length + " seleccionados"
          console.log('axa');
        }

    })
  });


}
console.log(Contactos());
  // Eliminar Contactos desde los check

eliminarcheck.addEventListener('click', eliminarContactos)

async function eliminarContactos() {
  for (let index = 0; index < array_id.length; index++) {
    const element = array_id[index];
     const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const EliminarC = await fetch("https://datawarehouse.onrender.com/api/contactos?id=" + `${element}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            }
        })
        const res = await EliminarC.json();
        Checklist.style.display = 'none';
        Contactos();
  }
 }







// Obtener Compañias para la creacion de contactos

const SelectNC = document.getElementById('SelectNC');
const SelectNCE = document.getElementById('SelectNCE');

async function compañias() {
  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const Compañias = await fetch("https://datawarehouse.onrender.com/api/compania", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  });
  const response = await Compañias.json();
  SelectNC.innerHTML = "";
  SelectNCE.innerHTML = "";
  for (let index = 0; index < response.length; index++) {
    const element = response[index];
    SelectNCE.innerHTML += `<option id="ContactosCE" class="Compañia"  value="${element.id}">${element.nombre_compania}</option>`;
    SelectNC.innerHTML += `
        <option id="Contactos" class="Compañia"  value="${element.id}">${element.nombre_compania}</option>`;
  }

}
console.log(compañias());

// Obtener paises

const paises = document.getElementById('paises');
const paisesE = document.getElementById('paisesE');

async function Paises() {
  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const ObtenerPaises = await fetch("https://datawarehouse.onrender.com/api/region/pais", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  })
  const responses = await ObtenerPaises.json();
  paises.innerHTML = ``;
  paisesE.innerHTML = ``;
  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];
    paises.innerHTML += `  <option id="paisSeleccionar" class="Region" value="${element.id}">${element.nombre_pais}</option>`;
    paisesE.innerHTML += `<option data-id="${element.region_id}" value="${element.id}">${element.nombre_pais}</option>`
  }
 
}
console.log(Paises());



const paisselect = document.querySelector('.SlcPais')
paises.addEventListener('change', SeleccionarPais)
paisesE.addEventListener('change', SeleccionarPais)

async function SeleccionarPais() {
  
  const seleccionarciudad = document.getElementById('seleccionarciudad');
  const seleccionarciudadE = document.getElementById('seleccionarciudadE');
  seleccionarciudad.disabled = false;
  seleccionarciudadE.disabled = false;
  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const ObtenerPaises = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad_pais?id=" + `${paises.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  })
  const responses = await ObtenerPaises.json();

//GET PARA EDITAR CONTACTO

  const ObtenerPaisesE = await fetch("https://datawarehouse.onrender.com/api/region/pais/ciudad_pais?id=" + `${paisesE.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearer
    }
  })
  const responsesE = await ObtenerPaisesE.json();


  seleccionarciudad.innerHTML = `<option value="" disabled selected>Seleccionar una Ciudad</option>`
  seleccionarciudadE.innerHTML = `<option value="" disabled selected>Seleccionar una Ciudad</option>`
  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];
    seleccionarciudad.innerHTML += `<option value="${element.id}">${element.nombre_ciudad}</option>`;
  }
  for (let index = 0; index < responsesE.length; index++) {
    const element = responsesE[index];
    seleccionarciudadE.innerHTML += `<option value="${element.id}">${element.nombre_ciudad}</option>`
  }
}



// Eliminar Contacto por id


async function EliminarContactoID(id) {
  if (id) {
    EliminarContacto.addEventListener('click', async () => {
          const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
          const EliminarC = await fetch("https://datawarehouse.onrender.com/api/contactos?id=" + `${id.target.id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Authorization': bearer
              }
          })
          const res = await EliminarC.json();
          Contactos();
      })
  }

}

// POST A CONTACTOS

const CrearContactobt = document.getElementById('CrearContactobt');
  
  CrearContactobt.addEventListener('click', CrearContacto)
  async function CrearContacto() {
      const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
      const NombreContacto = document.getElementById('NombreContacto').value;
      const ApellidoContacto = document.getElementById('ApellidoContacto').value;
      const CargoContacto = document.getElementById('CargoContacto').value;
      const EmailContacto = document.getElementById('EmailContacto').value;
      const DireccionContacto = document.getElementById('DireccionContacto').value;
      const InteresContacto = document.getElementById('InteresContacto').value;
      const CanalContacto = document.getElementById('CanalContacto').value;
      const CuentaUsuarioContacto = document.getElementById('CuentaUsuarioContacto').value;
      const ContactosC = document.getElementById('Contactos').value;
  
      const data = {
          "nombre_contacto": NombreContacto,
          "apellido_contacto": ApellidoContacto,
          "cargo_contacto": CargoContacto,
          "email_contacto": EmailContacto,
          "compania_contacto": ContactosC,
          "ciudad_contacto": seleccionarciudad.value,
          "direccion_contactos": DireccionContacto,
          "interes_contacto": InteresContacto,
          "canales_contacto": CanalContacto,
          "cuenta_usuario": CuentaUsuarioContacto,
          "pais_contacto": paises.value,
      }

      const CrearContacto = await fetch("https://datawarehouse.onrender.com/api/contactos", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': bearer
          },
          body: JSON.stringify(data)
      })
      const response = await CrearContacto.json();
      Contactos();
      /* location.reload(); */
    }
// PUT A CONTACTOS

const EditarContactobt = document.getElementById('EditarContactobt');
function EditarContactoID(id) {
EditarContactobt.addEventListener('click', EditarContacto)
async function EditarContacto() {
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const NombreContactoE = document.getElementById('NombreContactoE').value;
    const ApellidoContactoE = document.getElementById('ApellidoContactoE').value;
    const CargoContactoE = document.getElementById('CargoContactoE').value;
    const EmailContactoE = document.getElementById('EmailContactoE').value;
    const seleccionarciudadE = document.getElementById('seleccionarciudadE').value;
    const DireccionContactoE = document.getElementById('DireccionContactoE').value;
    const InteresContactoE = document.getElementById('InteresContactoE').value;
    const CanalContactoE = document.getElementById('CanalContactoE').value;
    const CuentaUsuarioContactoE = document.getElementById('CuentaUsuarioContactoE').value;
    const ContactosCE = document.getElementById('ContactosCE').value;
    

   

    const data = {
        "nombre_contacto": NombreContactoE,
        "apellido_contacto": ApellidoContactoE,
        "cargo_contacto": CargoContactoE,
        "email_contacto": EmailContactoE,
        "compania_contacto": ContactosCE,
        "ciudad_contacto": seleccionarciudadE,
        "direccion_contactos": DireccionContactoE,
        "interes_contacto": InteresContactoE,
        "canales_contacto": CanalContactoE,
        "cuenta_usuario": CuentaUsuarioContactoE
    }
    const EditarContacto = await fetch("https://datawarehouse.onrender.com/api/contactos?id=" + `${id.target.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer
        },
        body: JSON.stringify(data)
    })
    const response = await EditarContacto.json();
    Contactos();
    location.reload();
}

}

//GET A CONTACTOS POR EL SEARCH

const SearchInput = document.getElementById('SearchInput');
SearchClick.addEventListener('click', Borrar);
 
function Borrar() {
  if (SearchClick.innerText === 'search') {
    SearchClick.innerText = 'close';
    Buscar();
    
  } else if (SearchClick.innerText === 'close'){
    SearchClick.innerText = 'search';
    SearchInput.value = '';
    Contactos();
  }
}



async function Buscar() {

  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));

  const Buscador = await fetch("https://datawarehouse.onrender.com/api/contactos/search?search=" + `%${SearchInput.value}%`,{ 
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': bearer
  }
});

const response = await Buscador.json();


  tablacontactos.innerHTML = "";
 for (let index = 0; index < response.length; index++) {
   const element = response[index];
   
   tablacontactos.innerHTML += ` <tbody id="tablacontactos">
   <tr>
     <th scope="row" class="check">
       <p style="margin: 0;">
         <label>
           <input class="input" id="${element.id}" type="checkbox" />
           <span></span>
         </label>
       </p>
     </th>
     <th scope="row" id="nombres">${element.nombre_contacto} ${element.apellido_contacto} 
            <h6 class="email"> ${element.email_contacto} </h6>
     </th>
     <td>${element.nombre_ciudad}, ${element.nombre_pais}</td>
     <td>${element.nombre_compania}</td>
     <td>${element.cargo_contacto}</td>
     <td>${element.interes_contacto}%</td>
  
     <td class="btndelete"><a href="#EditarContacto" id="${element.id}" class="btn modal-trigger btn-small Editar">Editar</a>
       <a href="#modaldelete" class="modal-trigger Eliminar"><i class="material-icons" id="${element.id}"
           style="cursor: pointer;">close</i></a>
     </td>
 </tbody>`
 }

 
 document.querySelectorAll('.Eliminar').forEach(id => {
    id.addEventListener('click', EliminarContactoID)
});
  document.querySelectorAll('.Editar').forEach(id => {
    id.addEventListener('click', EditarContactoID)
  });
  
};

