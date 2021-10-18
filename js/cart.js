//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var cartInfoArray = [];

function showCartList(){
 
    let htmlContentToAppend = "";

    for(let i = 0; i < cartInfoArray.articles.length; i++){
        //recorro el array de la info del carrito
        let articlesinfo = cartInfoArray.articles[i];
        //le asigno a cartinfo cada elemento
        
     //Contenido el cual el javascript le pasa a products.html
    // a href redirije a la informacion de productos 
    htmlContentToAppend += `
    <div class="row">
        <div class="col-3">
            <img src="` + articlesinfo.src + `" alt="` + `" class="img-thumbnail" width="100" height="100">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ articlesinfo.name +`</h4>
                <small class="text-muted">` + articlesinfo.count + ` artículos</small>
            </div>
            <p class="text-muted">`+ articlesinfo.unitCost + ` ` + articlesinfo.currency+ `</p>
        </div>
    </div>
</div>
`
        
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            cartInfoArray = resultObj.data;

            showCartList()
            
      }       
   });
});
