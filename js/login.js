function validacion(){
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    //let recordar = document.getElementById("terminos").checked;

    if(email == "" || pass == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'soy una papa!',
            confirmButtonColor: '#0d6efd',
          })
    }else{
        window.location = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("entrar").addEventListener("click",()=>{
        validacion();
    })
})