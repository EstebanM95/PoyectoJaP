
function login(){                                       //funcion para el login
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    if(email === "" || pass === ""){                      // si los campos estan vacios, tira error
        alert('Debes Ingresar un correo y una contraseña');
    }else{ 
        sessionStorage.setItem('user', email);  //sino, redirige al index
        location.href = 'index.html';
    }
}
login();

document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("entrar").addEventListener("click",()=>{
        login();
    })
})