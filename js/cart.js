let compras = JSON.parse(localStorage.getItem("carritoLocal"));
let carrito = [];
// toma el objeto del local storage, lo parsea y lo agrega al arreglo que tiene el peugeot EL PEUGEOT NO ESTA MAS ALGO PASO
function cargarElCarrito() {
 for(let compra of compras){
    carrito.push(compra);
 }
}

// multiplica la cantidad de un producto por su propio costo para que la funcion de abajo pueda sumarlos
function subTotal(carrito, i) {
  let cantidad = document.getElementById("cantidad" + i).value;
  let costo = carrito.unitCost;
  resultado = cantidad * costo;

  document.getElementById("subTotal" + i).innerHTML = resultado;
}

// es el total de los items sumados, previamente multiplicado por sus cantidades en otra funcion
function total() {
  let costos = document.getElementsByClassName("costo");
  let total = 0;

  for (let i = 0; i < costos.length; i++) {
    total += parseFloat(costos[i].innerHTML);
  }
  document.getElementById("subTotalEnvio").innerHTML = total;
}


// los radio buttons del metodo de pago del modal
function radioButtons() {
  let tarjeta = document.getElementById("tarjeta");
  let transferencia = document.getElementById("transferencia");
  let nroTarjeta = document.getElementById("nroTarjeta");
  let cvc = document.getElementById("cvc");
  let vencimiento = document.getElementById("vencimiento");
  let cuenta = document.getElementById("cuenta");

  if (tarjeta.checked) {
    cuenta.disabled = true;
    nroTarjeta.disabled = false;
    cvc.disabled = false;
    vencimiento.disabled = false;
  } else if (transferencia.checked) {
    cuenta.disabled = false;
    nroTarjeta.disabled = true;
    cvc.disabled = true;
    vencimiento.disabled = true;
  }
}

//toma la suma de todos los subtotales de los productos y los multiplica seguno el costo de envio seleccionado
function costoDeEnvio() {
  let subTotal = document.getElementById("subTotalEnvio").innerHTML;
  let tipoEnvio = document.getElementById("tipoEnvio").value;
  let costoEnvio = subTotal * tipoEnvio;
  document.getElementById("costoEnvio").innerHTML = Math.round(costoEnvio);
}
//subtotal final con la suma de todo
function totalTotal() {
  let subTotal = JSON.parse(document.getElementById("subTotalEnvio").innerHTML);
  let costoEnvio = JSON.parse(document.getElementById("costoEnvio").innerHTML);
  let total = Math.round(subTotal + costoEnvio);
  document.getElementById("total").innerHTML = total;
}

//elimina los compras uno por uno CORREGIR ERROR
function borrarcompras(posicion){
carrito.splice(posicion, 1);
mostrarCarrito();
total();
costoDeEnvio();
totalTotal();
}

function mostrarCarrito() {
  let htmlContentToAppend = "";
  for (let i = 0; i<carrito.length; i++) {
    htmlContentToAppend += `
    <tr>
    <th><img src="${carrito[i].image}" style="width:65px"></th>
    <td>${carrito[i].name}</td>
    <td>${carrito[i].unitCost}</td>
    <td><span id="subTotal${i}"class="mb-2 btn-outline-primary costo">${carrito[i].unitCost}</span></td>
    <td><input id="cantidad${i}" class="form-control text-center form-control-md cantidades margin-right" min="1" max="10" value="1" type="number" onchange="subTotal(carrito[${i}],${i}), total(), costoDeEnvio(), totalTotal()"/></td>
    <td><a href="#!" style="color: #FF0000;"><i onclick="borrarcompras(${i})" name="basurero" class="fas fa-trash-alt act-price"></i></a></td>
    </tr>
    `;

  }    document.getElementById("carrito").innerHTML = htmlContentToAppend;
}

function validacion() {
  // let calle1 = document.getElementById("calleUno").value;
  // let calle2 = document.getElementById("calleDos").value;
  // let nroPuerta = document.getElementById("nroPuerta").value;
  // let tarjeta = document.getElementById("tarjeta");
  // let transferencia = document.getElementById("transferencia");

  let cuenta = document.getElementById("cuenta").value;
  let nroTarjeta = document.getElementById("nroTarjeta").value;
  let cvc = document.getElementById("cvc").value;
  let vencimiento = document.getElementById("vencimiento").value;
  let resultado = true;

  if ((nroTarjeta == "" || cvc == "" || vencimiento == "") && (cuenta = "")) {
    resultado = false;
    document.getElementById("feedbackPago").style.display = "inline";

  } else {
    document.getElementById("feedbackPago").style.display = "none";

    resultado = true;
  }
  console.log(resultado)
  return resultado;
}

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj){
    if (resultObj.status === "ok") {
      carrito.push( resultObj.data.articles[0]);
      cargarElCarrito();
      mostrarCarrito(carrito);
      total();
      costoDeEnvio();
      totalTotal();
    } if (localStorage.getItem("carritoLocal") != null) {
     // carrito = JSON.parse(localStorage.getItem("compras"));
      mostrarCarrito(carrito);
      total();
      costoDeEnvio();
      totalTotal();
    } else {
      carrito.push(localStorage.getItem("carritoLocal"));
      //localStorage.setItem("compras", JSON.stringify(carrito));
      mostrarCarrito(carrito);
      total();
      costoDeEnvio();
      totalTotal();
    }
  });

  document.getElementById("transferencia").addEventListener("click", ()=>{
    radioButtons();
  })
  document.getElementById("tarjeta").addEventListener("click", ()=>{
    radioButtons();
  })
  document.getElementById("formasDePago").addEventListener("click", ()=>{
    radioButtons();
  })
  document.getElementById("tipoEnvio").addEventListener("change",()=>{
    costoDeEnvio();
    totalTotal();
  })
  document.getElementById("finalizarCompra").addEventListener("click", (evento) => {
      validacion();
      if (document.getElementById("formulario").checkValidity()) {
        evento.preventDefault();
        evento.stopPropagation();
        Swal.fire({
          title: "Compra exitosa",
          imageUrl: "/img/purchase.gif",
          imageWidth: 200,
          imageHeigth: 100,
          timer: 4000,
        });
      }
      document.body.classList.add("was-validated");
    });
});
