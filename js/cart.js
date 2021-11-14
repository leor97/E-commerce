//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var cartInfoArray = [];
let resultadoaux;

function showCartList(){
 
    let htmlContentToAppend = "";

    for(let i = 0; i < cartInfoArray.articles.length; i++){
        //recorro el array de la info del carrito
        let articlesinfo = cartInfoArray.articles[i];
        //le asigno a cartinfo cada elemento
        
    htmlContentToAppend += `
    <div class="row">
        <div class="col-3">
            <img src=" ${articlesinfo.src} " class="img-thumbnail" width="100" height="100">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> ${articlesinfo.name} </h4>
                <input min="1" id="sub" type="number" onchange="subtotal()" value="${articlesinfo.count}" class="form-control">
            </div>
            <p class="text-muted"> ${articlesinfo.unitCost} ${articlesinfo.currency}</p>
        </div>
    </div>
</div>
`
        
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    subtotal()
    }
}

function subtotal(){

let resultado = document.getElementById("sub").value * cartInfoArray.articles[0].unitCost;
document.getElementById("productCostText").innerHTML = resultado;
resultadoaux = resultado; 
}

function payment(){
    if (document.getElementById('credit').checked) {
          document.getElementById('creditinfo').style.display = 'block';
          document.getElementById('bankinfo').style.display = 'none';
    }
    else if (document.getElementById('bank').checked){
      document.getElementById('bankinfo').style.display = 'block';
      document.getElementById('creditinfo').style.display = 'none';
    }
 }

 function validar(){
     console.log("Entro a la funcion")
     //ubicacion
     let calle = document.getElementById("calle").value
     let numero = document.getElementById("numero").value
     let esquina = document.getElementById("esquina").value
     let pais = document.getElementById("pais").value
     //modal
     let creditonum = document.getElementById("creditnum").value
     let creditoname = document.getElementById("creditname").value
     let banknum = document.getElementById("banknum").value
     
     if(creditonum =="" && creditoname =="" && banknum ==""){
         alert("Seleccione y complete el metodo de pago")
     }else if((creditoname =="" || creditonum=="") && banknum ==""){ 
         alert("Complete el metodo de pago")
     }else if((creditonum !="" && creditonum!="") && banknum !=""){
         alert("Solo puede elegir una forma de pago") // Si se deja uno de los campos de tarjeta de credito incompleto 
                                                    //y se opta por pagar con transferencia bancaria solo se dara como valido esta ultima forma de pago
     }else if(calle == "" || numero == "" || esquina == "" || pais == ""){
        alert("Debe completar todos los campos de ubicacion")
     }else{
         alert("Compra realizada con exito")
     }
}

function metodopago(){
 let porcentaje;
    if (document.getElementById("goldradio").checked){
        porcentaje = resultadoaux * 15 / 100
    }
    else if (document.getElementById("premiumradio").checked){
        porcentaje = resultadoaux * 7 / 100
    }
    else if (document.getElementById("standardradio").checked){
        porcentaje = resultadoaux * 3 / 100
    }else{
        porcentaje = resultadoaux * 15 / 100
    }
    document.getElementById("comissionText").innerHTML = porcentaje;
    let total = porcentaje + resultadoaux
    document.getElementById("totalCostText").innerHTML = total;
} 

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            cartInfoArray = resultObj.data;

            showCartList()
            metodopago()
      }       
   })
});

