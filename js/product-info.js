let comentarios = [];
let imagenes = [];
let relacionados = [];
let productos;
let idProductos = localStorage.getItem("produID");
var myCarousel = document.querySelector("#myCarousel");
var carousel = new bootstrap.Carousel(myCarousel);

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
    <div class="carousel-item active">
    <img src="${imagenes[0]}" class="d-block w-100" alt="...">
  </div>
  <div class="carousel-item">
      <img src="${imagenes[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagenes[2]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagenes[3]}" class="d-block w-100" alt="...">
    </div>
    `;
  document.getElementById("cosoFotos").innerHTML = htmlContentToAppend;
}

// funcion de mostrar comentarios
function mostrarComentarios() {
  let htmlContentToAppendTres = "";
  for (let comentario of comentarios) {
    htmlContentToAppendTres += `
    <div class="d-flex flex-start">
    <div>
      <h6 class="fw-bold mb-1">${comentario.user}</h6>
      <div class="d-flex align-items-center mb-3">
        <p class="mb-0">
        ${comentario.dateTime} <br>
        Calificacion:  <span class=" fa fa-star checked"></span> X ${comentario.score}
        </p>
      </div>
      <p class="mb-0">
        ${comentario.description}
      </p>

    </div>
  </div>
</div>
<hr class="my-0" />
<br>`;
  }
  document.getElementById("comentarios").innerHTML = htmlContentToAppendTres;
}

function agregarComentario() {
  let fecha = new Date();
  let comentario ={};
  comentario.user = sessionStorage.getItem("user");
  comentario.description = document.getElementById("cajaComentario").value;
  comentario.dateTime= fecha.getFullYear() + "-" + parseInt(fecha.getMonth()+ 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
  comentario.score = document.getElementById("puntuacion").value;
  comentarios.push(comentario);
  mostrarComentarios();

}

// toma la id del relacionado que se haga click y vuelve a setear el produ id con esa id y carga de nuevo product info
function accederRelacionados(id) {
  localStorage.setItem("produID", id);
  window.location = "product-info.html";
}

// funcion de mostrar los relacionados
function mostrarRelacionados() {
  let htmlContentToAppend = "";
  for (let relacionado of relacionados) {
    htmlContentToAppend += `
    <div class="col-md-3">
    <div onclick="accederRelacionados(${relacionado.id})" class="product">
      <div class="product-card">
        <span class="sale">${relacionado.name}</span>
        <img src="${relacionado.image}" class="rounded img-fluid">
      </div>
    </div>
  </div>`;  
  }

  document.getElementById("relacionados").innerHTML = htmlContentToAppend;
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
  getJSONData(PRODUCT_INFO_COMMENTS_URL + idProductos + EXT_TYPE).then(
    function (resultObj) {
      if (resultObj.status === "ok") {
        comentarios = resultObj.data;
        mostrarComentarios();
      }
    }
  );
  document.getElementById('enviar').addEventListener('click',()=>{
    agregarComentario();
    document.getElementById("cajaComentario").value = "";
})
});
