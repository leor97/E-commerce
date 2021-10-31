//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let recibidoarray = []; //array con dados de json

function setprofileinfo(){ //setea las variables con los id value

let infoperfil = {primerNombre: document.getElementById("pnompro").value,
segundoNombre: document.getElementById("snompro").value,
primerApellido: document.getElementById("papepro").value,
segundoApellido: document.getElementById("sapepro").value,
edad: document.getElementById("edadpro").value,
email: document.getElementById("mailpro").value,
telefono: document.getElementById("telpro").value}

localStorage.setItem("JSONperfil", JSON.stringify(infoperfil));

}



function profileparse(){ //trae y setea las variables con datos de json

let recibido = JSON.parse(localStorage.getItem("JSONperfil"));

let primerNombre = recibido.primerNombre;
let segundoNombre = recibido.segundoNombre;
let primerApellido = recibido.primerApellido;
let segundoApellido = recibido.segundoApellido;
let edad = recibido.edad;
let email = recibido.email;
let telefono = recibido.telefono;

recibidoarray = recibido;
document.getElementById("pnompro").value = primerNombre
document.getElementById("snompro").value = segundoNombre
document.getElementById("papepro").value = primerApellido
document.getElementById("sapepro").value = segundoApellido
document.getElementById("edadpro").value = edad
document.getElementById("mailpro").value = email
document.getElementById("telpro").value = telefono

}

document.addEventListener("DOMContentLoaded", function (e) {
  
  document.getElementById("save").onclick = function(e){
    if(document.getElementById("pnompro").value && document.getElementById("snompro").value && 
       document.getElementById("papepro").value && document.getElementById("sapepro").value &&
       document.getElementById("edadpro").value && document.getElementById("mailpro").value &&
       document.getElementById("telpro").value){
    setprofileinfo()   
    }
  }
  if(recibidoarray != []){ 
    profileparse()
  }
});