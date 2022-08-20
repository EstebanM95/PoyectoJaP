document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    let usuario = sessionStorage.getItem('user');
    if (usuario == null){
       alert('Debes Ingresar como Usuario');
        location.href = "login.html";
    }else{
        alert("bienvenido " + usuario);
    }

    document.getElementById("cierro").addEventListener("click",() =>{
        alert("Nos Vemos");
        localStorage.clear();
        location.href = "login.html";
    });
});