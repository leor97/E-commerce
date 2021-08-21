//Se hace una funcion validar para redirecionar a la pagina de inicio "home.html" en caso que el usuario 
//digite su nombre y contraseña
function validar(){

    let nombre = document.getElementById("nombre").value; //Encuentra el valor de lo que ponga el usuario en username
    let contra = document.getElementById("contra").value; //Encuentra el valor de lo que ponga el usuario en password
    if((nombre !== "") && (contra!== "")){  //si el usuario escribe tanto en username como en password entra al if
    
        window.location.href="home.html"; //y redirecciona a home.html
    }
else{
    alert("debe completar los campos requeridos"); //en caso contrario salta una alerta de que el usuario debe completar los campos
}
return false;
}