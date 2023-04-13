


//GET A USUARIOS 

const tablausuarios = document.getElementById('tablausuarios');
const modalusuarios = document.getElementById('modalusuarios');



modalusuarios.addEventListener('click', Usuarios)

async function Usuarios(e) {

  const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
  const mostrarUsuarios = await fetch("https://datawarehouse.onrender.com/api/usuarios", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': bearer
      }
  });
  const response = await mostrarUsuarios.json();
  tablausuarios.innerHTML = "";
  for (let index = 0; index < response.length; index++) {
      const element = response[index];
      console.log(element);
      if (element.perfil === 1) {
        element.perfil = "Administrador"
      } else {
        element.perfil =  "Basico"
      }
      tablausuarios.innerHTML += `<tbody id="tablausuarios">
      <tr>
        <th scope="row">${element.nombre_usuario}</th>
        <td>${element.apellido_usuario}</td>
        <td>${element.email}</td>
        <td>${element.perfil}</td>
        <td>
          <div class="btndelete" > <a
              id="${element.id}" class="waves-effect waves-light btn modal-trigger btn btn-outline-dark btn-small id"
              href="#ActualizarUsuario">Editar</a>
            <a href="#deleteusuario" class="modal-trigger"><i class="material-icons closeusuario" id="${element.id}"
                style="cursor: pointer;">close</i></a>
        </td>
</div>
</tr>
</tbody>` ;
  }
  document.querySelectorAll('.closeusuario').forEach(id => {
    id.addEventListener('click', EliminarUsuario)
});
document.querySelectorAll('.id').forEach(id2 => {
  id2.addEventListener('click', actualizar)
});
}

//DELETE  A USUARIOS

const eliminarusuario = document.getElementById('eliminarusuario')

async function EliminarUsuario(id) {
  if (id) {
    eliminarusuario.addEventListener('click', async () => {
          console.log(id.target.id);
          const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
          const EliminarU = await fetch("https://datawarehouse.onrender.com/api/usuarios?id=" + `${id.target.id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Authorization': bearer
              }
          })
          const res = await EliminarU.json();
          Usuarios();
      })
  }

}


//POST A USUARIOS

BotonUsuario.addEventListener('click', CrearUsuario)


  async function CrearUsuario(e) {
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
    const Nombre = document.getElementById('Nombre').value;
    const Apellido = document.getElementById('Apellido').value;
    const inputEmail3 = document.getElementById('inputEmail3').value;
    const Perfil = document.getElementById('Perfil').value;
    const inputPassword3 = document.getElementById('inputPassword3').value;
    const inputRepeatPassword = document.getElementById('inputRepeatPassword').value;
    

    /* e.preventDefault(); */

    const data = {
     "nombre_usuario": Nombre,
     "apellido_usuario": Apellido,
     "email": inputEmail3,
     "perfil": Perfil,
     "contrasena": inputPassword3,
    }

    
    const crearusuario = await fetch("https://datawarehouse.onrender.com/api/registrar", {
      method:'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': bearer
      },
      body: JSON.stringify(data)
    })
    const res = await crearusuario.json()
    
  }
    
 // PUT A USUARIOS
 const UsuarioActualizar = document.getElementById("UsuarioActualizar");

 function actualizar(id2) {
  UsuarioActualizar.addEventListener('click', ActualizarUsuario)
     async function ActualizarUsuario() {
       try {
         const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
         const ActualizarNombre = document.getElementById('ActualizarNombre').value;
         const ActualizarApellido = document.getElementById('ActualizarApellido').value;
         const ActualizarMail = document.getElementById('ActualizarMail').value;
         const ActualizarPerfil = document.getElementById('ActualizarPerfil').value;
         console.log(ActualizarPerfil);
        
  
         const data = {
             "nombre_usuario": ActualizarNombre,
             "apellido_usuario": ActualizarApellido,
             "email": ActualizarMail,
             "perfil": ActualizarPerfil,
         }
  
         const ActualizarUsuarios = await fetch("https://datawarehouse.onrender.com/api/usuarios?id=" + `${id2.target.id}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*',
                 'Authorization': bearer
             },
             body: JSON.stringify(data)
         })
  
         const response = await ActualizarUsuarios.json();
         console.log(ActualizarUsuarios);
         Usuarios();
         location.reload();
         document.getElementById("miForm").reset();
         
       } catch (error) {
         console.log(error);
       }
        
     }
 }
    