
function iniciarSesion(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    // Datos de acceso de demostración
    const usuarioCorrecto = "admin";
    const contrasenaCorrecta = "fresilove123";

    if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {

        document.getElementById("login").style.display = "none";
        document.getElementById("panel").style.display = "block";

    } else {

        document.getElementById("mensajeLogin").textContent =
            "Usuario o contraseña incorrectos. Inténtalo de nuevo 💗";
    }
}

function cerrarSesion() {

    document.getElementById("panel").style.display = "none";
    document.getElementById("login").style.display = "block";

    document.getElementById("usuario").value = "";
    document.getElementById("contrasena").value = "";
    document.getElementById("mensajeLogin").textContent = "";
}
