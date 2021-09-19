//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {}

function drawStars(score) {  //funcion de crear estrellas
    var checked = "";
    var unChecked = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            checked += `<span class="fa fa-star checked"></span>` //estrella llena
        } else {
            unChecked += `<span class="fa fa-star"></span>` //estrella vacia
        }
    }
    return (checked + unChecked); //retorna el resultado de ambas
}


function showComments(list) {

    let htmlContentToAppend = "";

    for (let i = 0; i < list.length; i++) {
        //hago el for para recorrer el arreglo de comentarios
        let comment = list[i];
        //le asigno a comment cada elemento

        htmlContentToAppend += `
                    <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><strong>`+ comment.user + "</strong>" + "&nbsp" + comment.dateTime + `</h5>
                <small class="text-muted">` + drawStars(comment.score) + `</small>
            </div>
            <p class="mb-1">` + comment.description + `</p>
        </div>
        <hr class="my-3">
`
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}


function showImagesGallery(array) { //muestra las imagenes del producto

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) { //obtiene el JSON de informacion de productos y setea a product cada valor del JSON
        if (resultObj.status === "ok") {

            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});


document.addEventListener("DOMContentLoaded", function (e) { //llama a la funcion de showComments con el JSON de comentarios 
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            showComments(resultObj.data);
        }
    })
});

document.getElementById("enviarNuevoComentario").addEventListener("click", function () { //al clickear el boton se llama la funcion
    agregarComentario();
    document.getElementById("nuevoComentarioTextoID").value = "";
});

function agregarComentario() {
    comentarioAux = document.getElementById("nuevoComentarioTextoID").value;
    let score = document.getElementById("puntuacionId").value;


    if (comentarioAux == "") { //Controla que el comentario no este vacio 
        alert("Por favor introduce la informacion requerida!");
    } else { // al estilo del JSON
        let htmlContentToAppend = `
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1"><strong>`+ localStorage.getItem("usuario") + "</strong>" + "&nbsp" + getFecha() + `</h5>
        <small class="text-muted">` + drawStars(score) + `</small>
        </div>
        <p class="mb-1">` + comentarioAux + `</p>
        </div>
    <hr class="my-3">
`

        document.getElementById("Comentario").innerHTML += htmlContentToAppend;
    }

}
function getFecha() { //obtiene lo que seria comment.datetime 
    let date = new Date(); 
    let day = date.getDate().toString().padStart(2, '0'); //si es de solo un digito añade el 0
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    let year = date.getFullYear().toString().padStart(2, '0'); 
    let hour = date.getHours().toString().padStart(2, '0'); 
    let minutes = date.getMinutes().toString().padStart(2, '0'); 
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds} `; 
    return dateTime; 
}
