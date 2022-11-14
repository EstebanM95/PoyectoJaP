let correo = sessionStorage.getItem("user");
//recibe el avatar cargado, los transforma a base64 y lo muestra en el lugar
function cambiarAvatar() {
  let avatarUsuario = document.getElementById("inputImagen");
}

function mostrarCosas() {
  document.getElementById("email").value = correo;
  let perfil = JSON.parse(localStorage.getItem("perfil"));
  document.getElementById("nombre").value = perfil.nombre;
  document.getElementById("nombre2").value = perfil.segundoNombre;
  document.getElementById("apellido").value = perfil.apellido;
  document.getElementById("apellido2").value = perfil.segundoApellido;
  document.getElementById("telefono").value = perfil.telefono;  
}

//valida los campos de nombre, apellido, y email
function validacion() {
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let bandera = true;
if(nombre.value == ""){
  document.getElementById("feedback-nombre").classList.add("invalid-color");
  document.getElementById("feedback-nombre").style.display = "inline";
  bandera = false
}else{
  document.getElementById("feedback-nombre").classList.remove("invalid-color");
  document.getElementById("feedback-nombre").style.display = "none";
  bandera = true
}

if(apellido.value ==""){
  document.getElementById("feedback-apellido").classList.add("invalid-color");
  document.getElementById("feedback-apellido").style.display = "inline";
  bandera = false

}else{
  document.getElementById("feedback-apellido").classList.remove("invalid-color");
  document.getElementById("feedback-apellido").style.display = "none";
  bandera = true
}
console.log(bandera)
return bandera;
}

//crea el objeto datosLocal, toma los datos del form y los guarda en el objeto y despues crea el item perfil en el local storage y lo llena con datosLocal
function tomarDatos() {
  let datosLocal = {};
  datosLocal.nombre = document.getElementById("nombre").value;
  datosLocal.segundoNombre = document.getElementById("nombre2").value;
  datosLocal.apellido = document.getElementById("apellido").value;
  datosLocal.segundoApellido = document.getElementById("apellido2").value;
  datosLocal.correo = document.getElementById("email").value;
  datosLocal.telefono = document.getElementById("telefono").value;
  localStorage.setItem("perfil", JSON.stringify(datosLocal));
}


//evento de click sobre el boton guardar, ejecuta tomardatos
document.getElementById("guardar").addEventListener("click", () => { 
  if(validacion()){
    tomarDatos();
    Swal.fire({
    position: "top-end",
    icon: "success",
    title: "datos guardados",
    showConfirmButton: false,
    timer: 1500,
  });
  }

});

  document.getElementById("formularioPerfil").addEventListener("submit", e=>{
    if(!validacion||!formularioPerfil.checkValidity()){
    e.preventDefault();
    e.stopPropagation();
  }
    document.body.classList.add('was-validated');

    let eventos=['change', 'input'];
    
    eventos.forEach( evento=> {document.body.addEventListener(evento, miValidacion)})
  })

document.addEventListener("DOMContentLoaded", () => {
  mostrarCosas();

}); 