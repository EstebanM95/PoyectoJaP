let comentarios = [];
let imagenes = [];
let relacionados = [];
let productos;
let idProductos = localStorage.getItem("produID");

//funcion de mostrar informacion
function mostrarInfo() {
document.getElementById("nombre").innerHTML = productos.name;
  document.getElementById("descripcion").innerHTML = productos.description;
  document.getElementById("categoria").innerHTML = productos.category;
  document.getElementById("vendidos").innerHTML = productos.soldCount;
  document.getElementById("precio").innerHTML = productos.cost;
  document.getElementById("moneda").innerHTML = productos.currency;
}

// funcion de mostrar solo las fotos
function mostrarFotos() {
  let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="images p-3">
    <div class="text-center p-4" style="width: 400px; height: 200px;"> <img id="main-image"  class= "img-responsive" src="${imagenes[0]}" width="250" /> </div>
    <div id="imagen" class="thumbnail text-center" style="width: 400px; height: 200px;">
     </div>
    </div>
    `;
    document.getElementById("cosoFotos").innerHTML = htmlContentToAppend;
    let htmlContentToAppendDos ="";
    for(let imagen of imagenes){
      htmlContentToAppendDos +=`<img onclick="change_image(this)" src="${imagen}" width="100"></img>`
    }
    document.getElementById("imagen").innerHTML = htmlContentToAppendDos;
  }


// funcion de mostrar los relacionados
function mostrarRelacionados(){
  let htmlContentToAppend= "";
  for(let relacionado of relacionados){
  htmlContentToAppend += `<div class= "box" ><br> <p class="">${relacionado.name}</p> <img class= "" src="${relacionado.image}" width="100"> </div> `
}


document.getElementById("relacionados").innerHTML = htmlContentToAppend;
}

function mostrarComentarios(){

  let htmlContentToAppendTres ="";
  for (let comentario of comentarios){
    htmlContentToAppendTres += `<li> ${comentario.user} dijo: "${comentario.description}" <span class="fa fa-star checked"></span> X ${comentario.score} <br> publicado el: ${comentario.dateTime} </li>`;
  }
  document.getElementById('comentarios').innerHTML = htmlContentToAppendTres;
}

// funcion del snippet de bootstrap
function change_image(image){

    var container = document.getElementById("main-image");

   container.src = image.src;
}

// getJSON de la info completa de los productos
document.addEventListener("DOMContentLoaded", () => {
  getJSONData(PRODUCT_INFO_URL + idProductos + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      relacionados = resultObj.data.relatedProducts;
      imagenes = resultObj.data.images;
      productos = resultObj.data;
      mostrarInfo();
      mostrarFotos();
      mostrarRelacionados();

    }
  });

//getJSON de los comentarios
  getJSONData(PRODUCT_INFO_COMMENTS_URL + idProductos + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      comentarios = resultObj.data;
      console.log(comentarios);
      mostrarComentarios();
    }
  });

});
