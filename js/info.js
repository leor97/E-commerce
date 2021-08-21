function validar(){

    let nombre = document.getElementById("nombre").value;
    let contra = document.getElementById("contra").value;
    if((nombre !== "") && (contra!== "")){
        //alert("entra al if")
        window.location.href="home.html";
    }
else{
    alert("debe completar los campos requeridos");
}
return false;
}