//Se hace una funcion validar para redirecionar a la pagina de inicio "home.html" en caso que el usuario 
//digite su nombre y contraseña
function validar(){

    let nombre = document.getElementById("nombre").value; //Encuentra el valor de lo que ponga el usuario en username
    let contra = document.getElementById("contra").value; //Encuentra el valor de lo que ponga el usuario en password
    if((nombre !== "") && (contra!== "")){  //si el usuario escribe tanto en username como en password entra al if
        localStorage.setItem("usuario", nombre); // guarda el nombre por local storage
        window.location.href="home.html"; //y redirecciona a home.html
    }
else{
    alert("debe completar los campos requeridos"); //en caso contrario salta una alerta de que el usuario debe completar los campos
}
return false;
}

function setUsuario(){
    let nombre = document.getElementById("nombre").value; //obtiene el dato nombre 
    localStorage.setItem("usuario",nombre); //se guarda el dato nombre a usuario
}

document.addEventListener("DOMContentLoaded", function(e){ //se llaman estas funciones cuando se carga la pagina
   setUsuario(); 
});