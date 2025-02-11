function boton_mid() {
    document.getElementById("boton_casa").style.display = "block";
    document.getElementById("medio-btn").style.display = "none";
    document.getElementById("Beneficio_boton").style.display = "block";
}

function beneficios(){
    document.getElementById("contenido_beneficio").style.display = "block";
    document.getElementById("Beneficio_boton").style.display = "none";
    document.getElementById("boton_casa").style.display = "none";    
}

function boton_refresh() {
    location.reload();
}

