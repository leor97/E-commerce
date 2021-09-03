//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_COST = "MAS BARATOS";
const ORDER_DESC_BY_UNITS_SOLD = "MAS VENDIDOS";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost); //al ser cost un tipo de dato string en el JSON es necesario usar parseInt para que sea un entero
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if(criteria === ORDER_DESC_BY_UNITS_SOLD){
        result = array.sort(function(a, b) {
            let aSoldcount = parseInt(a.soldCount); //lo mismo que pasa con cost tambien se aplica a soldCount
            let bSoldcount = parseInt(b.soldCount);

            if ( aSoldcount > bSoldcount ){ return -1; }
            if ( aSoldcount < bSoldcount ){ return 1; }
            return 0;
        });    
    }
    return result;
}


function showProductsList(){

    let htmlContentToAppend = "";

    for(let i = 0; i < currentProductsArray.length; i++){
        //hago el for para recorrer el arreglo "list" de productos
        let product = currentProductsArray[i];
        //le asigno a product cada elemento

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
            //se evalua el costo de cada producto en funcion de un minimo y maximo, necesario para filtrar.

    //Contenido el cual el javascript le pasa a products.html
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ product.name +`</h4>
                <small class="text-muted">` + product.soldCount + ` artículos</small>
            </div>
            <p class="mb-1">` + product.description + `</p>
            <p class="text-muted">`+ product.currency + ` ` + product.cost + `</p>
        </div>
    </div>
</div>
`
        }
    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los products ordenados
    showProductsList();
}

//Si el contenido del JSON llega de forma correcta se ejecuta la funcion showProductsList con el contenido del JSON
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){ 
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data); //por defecto se ordena la lista de productos de forma acendente
        }
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){ // ordena ascendente
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){ // ordena descendente
        sortAndShowProducts(ORDER_DESC_BY_UNITS_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){ //limpia el filtro
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){ 
        //Obtengo el mínimo y máximo de los intervalos para filtrar por rango de precio de los productos

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value; 

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount); //settea el valor de minCount
        }
        else{
            minCount = undefined; //si no tiene nada lo deja indefinido
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});
