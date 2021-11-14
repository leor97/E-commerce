const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.getElementById("usuarioguardado").addEventListener("click", function(e){ //Sirve para que se muestre iniciar seccion si el usuario esta vacio 
  let nombre = localStorage.getItem("usuario"); 
  if(nombre==undefined || nombre==""){
    window.location.href = "./index.html"  
  }
});

function exit(){
localStorage.clear();
    window.location.href = "./index.html"
    
}
function getUsuario(){
      let nombre = localStorage.getItem("usuario"); //se recupera el dato "usuario" definido
      if(nombre!=undefined && nombre!=""){ //controlar que en nombre no haya nada o este vacio
        let usuarioPerfil = document.getElementById("usuarioguardado"); //settea la variable usuarioPerfil al espacio que le corresponde al nombre de usuario en el menu
        usuarioPerfil.innerHTML = nombre; //iguala el valor de la variable a el nombre de usuario
    }else{
      document.getElementById("usuarioguardado").innerHTML += "Iniciar sesion" //muestra iniciar sesion 
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ //se llaman estas funciones cuando se carga la pagina
  getUsuario(); 
});

document.addEventListener("DOMContentLoaded", function(e){
  /*if (document.getElementById("Close")!==null){
      document.getElementById("Close").addEventListener("click",function(e){
      localStorage.clear();
  })
 }*/
}); 




//http://vocab.nic.in/rest.php/country/json