let productos=[];
let listafiltrada = [];
const MAYOR_A_MENOR_PRECIO = "+-";
const MENOR_A_MAYOR_PRECIO = "-+";
const ORDEN_CANTIDAD_VENDIDOS = "precio";
let criterioActual = undefined;
let precioMin = undefined;
let precioMax = undefined;
let id = localStorage.getItem('catID');

// guarda el id del producto para enviarlo a la pagina especifica del mismo
function setProduId(id) {
    localStorage.setItem("produID", id);
    window.location = "product-info.html"
}


//ordena segun el criterio 
function ordenarProductos(criterio, array){
    let filtrado = [];
 
        if (criterio === MENOR_A_MAYOR_PRECIO)
        {
            filtrado = array.sort((a, b)=> a.cost - b.cost)
    
        }else if (criterio === MAYOR_A_MENOR_PRECIO){
            
            filtrado = array.sort((a, b)=> b.cost - a.cost)
    
        }else if (criterio === ORDEN_CANTIDAD_VENDIDOS){
            filtrado = array.sort((a, b)=> b.soldCount - a.soldCount)
        }
    
    
return filtrado;
}



//mostrar productos
function mostrarProductos(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let products = array[i];

        if (((precioMin == undefined) || (precioMin != undefined && parseInt(products.cost) >= precioMin)) &&
        ((precioMax == undefined) || (precioMax != undefined && parseInt(products.cost) <= precioMax))){

        htmlContentToAppend += `
        <div onclick="setProduId(${products.id})" class="fondo list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                    <small class="text-muted">${products.soldCount} artículos vendidos</small>
                </div>
                <p class="mb-1">${products.description}</p>
            </div>
        </div>
        </div>
        `

        document.getElementById("productos").innerHTML = htmlContentToAppend; 
    }
  }

}

function buscador(){

    
    let buscado = document.getElementById("buscador").value;

    let listafiltrada = productos.filter(productos => {
    
        nombreBuscado = productos.name.toLowerCase().indexOf(buscado.toLowerCase()) > -1;
        descripcionBuscado = productos.description.toLowerCase().indexOf(buscado.toLowerCase()) > -1;

    return (nombreBuscado) || (descripcionBuscado)})
    mostrarProductos(listafiltrada);
}

//mostrar categorias ordenadas
function mostrarProductosFiltrados(criterio){
    criterioActual = criterio;
    productos = ordenarProductos(criterioActual, productos);

    //Muestro las categorías ordenadas
    mostrarProductos(productos);
}

// todo el dom content
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCTS_URL + id + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data.products;
            mostrarProductos(productos);
        }
    });

    document.getElementById("menorAMayor").addEventListener("click", ()=>{
        mostrarProductosFiltrados(MENOR_A_MAYOR_PRECIO);

    });

    document.getElementById("mayorAMenor").addEventListener("click", ()=>{
        mostrarProductosFiltrados(MAYOR_A_MENOR_PRECIO);

    });

    document.getElementById("relevantes").addEventListener("click", ()=>{
        mostrarProductosFiltrados(ORDEN_CANTIDAD_VENDIDOS);

    });

    document.getElementById("botonLimpiar").addEventListener("click",()=>{
        document.getElementById("rangoPrecioMinimo").value = "";
        document.getElementById("rangoPrecioMaximo").value = "";

        precioMin = undefined;
        precioMax = undefined;
        criterioActual = undefined;

        mostrarProductos(productos);
    });

    document.getElementById("buscar").addEventListener("click", ()=>{

        buscador(listafiltrada);
    })

    document.getElementById("botonFiltrar").addEventListener("click", ()=>{
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        precioMin = parseInt(document.getElementById("rangoPrecioMinimo").value);
        precioMax = parseInt(document.getElementById("rangoPrecioMaximo").value);
    
        if ((precioMin != undefined) && (precioMin != "") && (precioMin) >= 0){
            precioMin = precioMin;
        }
        else{
            precioMin = undefined;
        }
    
        if ((precioMax != undefined) && (precioMax != "") && (precioMax) >= 0){
            precioMax = precioMax;
        }
        else{
            precioMax = undefined;
        }
        mostrarProductos(productos);
        
    });

});