const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL ="https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL ="https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

//get json principal que toma los datos del json y los vuelve en informacion trabajable 
let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

// buscamos el item user que tiene el valor del nombre de usuario y lo guardamos en la variable
//va en init porque esta asociado a todos los html
let usuario = sessionStorage.getItem('user');

// creamos la variable nombreUsuario para asociarlo a la variable usuario
let nombreUsuario = "";
nombreUsuario += usuario;

//nombreUsuario va dentro de la etiqueta html con id usuario en todos los html
document.getElementById("usuario").innerHTML = nombreUsuario; 

// si usuario no tiene valor redirige al login para poder entrar, y enviar la alerta para avisar esto mismo
// va en init porque esta asociado a todos los html y evitar entrar a cualquier parte sin login
if (usuario == null){
  location.href = "login.html";
 alert('Debes Ingresar como Usuario');
}

//parar cerar sesion, esperamos el click en el boton de html con id cierro
//enviamos el mensaje de salida, borrar el local storage para no dejar un usuario o id
//redirigimos al login de nuevo
document.getElementById("cierro").addEventListener("click", () => {
  localStorage.removeItem("perfil");
  alert("Nos Vemos");  
  location.href = "login.html";
});
