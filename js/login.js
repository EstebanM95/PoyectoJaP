//funcion para el login
function login(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

     // si los campos estan vacios, tira error
    if(email === "" || pass === ""){
        alert('Debes Ingresar un correo y una contraseña');
        //sino, es decir, si email y pass ya tienen valor, redirige al index
    }else{ 
        //creamos el item user con el valor del campo email
        sessionStorage.setItem('user', email);
        location.href = 'index.html';
    }
}
login();
// escuchamos al click del boton entrar de login.html
document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("entrar").addEventListener("click",()=>{
        login();
    })
})