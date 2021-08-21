//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showProductsList(list){

    let htmlContentToAppend = "";

    for(let i = 0; i < list.length; i++){
        //hago el for para recorrer el arreglo "list" de productos
        let product = list[i];
        //le asigno a product cada elemento

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
document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
 }
}
//Si el contenido del JSON llega de forma correcta se ejecuta la funcion showProductsList con el contenido del JSON
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){ 
            showProductsList(resultObj.data);
        }
    });
    showProductsList();
});
