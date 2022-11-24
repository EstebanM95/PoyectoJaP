let comentarios = [];
let carritoLocal = [];
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

//funcion para meter articulos al carrito
function agregarArticulo() {
  let articulo = {};
  articulo.id = JSON.parse(localStorage.getItem("produID"));//tomo la id del producto del json
  articulo.name = productos.name;// tomo el nombre del arreglo del producto
  articulo.count = 1; //siempre empieza en 1 unidad de producto
  articulo.currency = productos.currency; // tomo la moneda del arreglo del producto
  articulo.unitCost = productos.cost;// tomo el costo del arreglo del producto
  if(articulo.currency == "UYU"){// si la moneda del producto es el string "UYU", 
    articulo.unitCost = Math.round(articulo.unitCost /40);//divide y redondea el costo del articulo por 40
    articulo.currency = "USD"//modifica la moneda por "USD"
  }
  articulo.image = imagenes[0];//toma la primer imagen del arreglo imagenes
  carritoLocal.push(articulo);//empuja el articulo al arreglo carritoLocal
  localStorage.setItem("carritoLocal", JSON.stringify(carritoLocal));//crea el item carritoLocal en localstorage, stringifica carritoLocal y lo mete en carritoLocal del local
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
        Calificacion: ${puntaje(comentario.score)}
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

// muestra el puntaje de los comentarios, el rating lo trajo el JSON
function puntaje(array) {
  let puntos = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= array) {
      puntos += `<i class="fa fa-heart checked" aria-hidden="true"></i>`;
    } else {
      puntos += `<i class="fa fa-heart" aria-hidden="true"></i>`;
    }
  }
  return puntos;
}

//crea un comentario igual al los del json y lo agrega al array asi se muestran igual
function agregarComentario() {
  let fecha = new Date();
  let comentario = {};
  comentario.user = sessionStorage.getItem("user");
  comentario.description = document.getElementById("cajaComentario").value;
  comentario.dateTime =
    fecha.getFullYear() +
    "-" +
    parseInt(fecha.getMonth() + 1) +
    "-" +
    fecha.getDate() +
    " " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
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
    <div onclick="accederRelacionados(${relacionado.id})" class="">
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
carritoLocal= JSON.parse(localStorage.getItem("carritoLocal"));

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
  document.getElementById("seguirComprando").addEventListener("click",()=>{
    location.href="categories.html";
  })
  document.getElementById("IrAlCarrito").addEventListener("click",()=>{
    location.href="cart.html";
  })
  document.getElementById("sumarAlCarrito").addEventListener("click", () => {
    agregarArticulo();
  });
  document.getElementById("enviar").addEventListener("click", () => {
    agregarComentario();
    document.getElementById("cajaComentario").value = "";
  });

});
