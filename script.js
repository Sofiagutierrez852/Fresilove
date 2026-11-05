
function seleccionarProducto(producto, precio) {

    const mensaje =
        "🍓 ¡Hola Fresilove! Quiero pedir:\n\n" +
        "Producto: " + producto + "\n" +
        "Precio: $" + precio.toLocaleString("es-CO") + "\n\n" +
        "¡Muchas gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
}


function actualizarTotal() {
    let total = Number(document.getElementById("tamano").value);

    const toppings = document.querySelectorAll(".topping:checked");

    toppings.forEach(function(topping) {
        total += Number(topping.value);
    });

    document.getElementById("total").textContent =
        "Total: $" + total.toLocaleString("es-CO");
}


document.getElementById("tamano").addEventListener("change", actualizarTotal);

document.querySelectorAll(".topping").forEach(function(topping) {
    topping.addEventListener("change", actualizarTotal);
});


function crearPedido() {
    actualizarTotal();

    const tamano = document.getElementById("tamano");
    const nombreTamano = tamano.options[tamano.selectedIndex].text;

    const toppings = document.querySelectorAll(".topping:checked");

    let listaToppings = "";

    toppings.forEach(function(topping) {
        listaToppings += "• " + topping.parentElement.textContent.trim() + "\n";
    });

    if (listaToppings === "") {
        listaToppings = "Sin toppings adicionales";
    }

    const total = document.getElementById("total").textContent;

    const mensaje =
        "🍓 ¡Hola Fresilove! Quiero hacer este pedido:\n\n" +
        "Tamaño: " + nombreTamano + "\n\n" +
        "Toppings:\n" + listaToppings + "\n" +
        total + "\n\n" +
        "¡Gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
}

function enviarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const pedido = document.getElementById("pedido").value;

    const mensaje =
        "🍓 ¡Hola Fresilove! Tengo una solicitud:\n\n" +
        "Nombre: " + nombre + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Pedido: " + pedido + "\n\n" +
        "¡Muchas gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
}

function recomendarFresilove() {

    const gusto = document.getElementById("gusto").value;
    const respuesta = document.getElementById("respuestaAsistente");

    if (gusto === "") {
        respuesta.innerHTML = "<p>💗 Primero debes elegir qué sabor se te antoja.</p>";
        return;
    }

    let recomendacion = "";

    if (gusto === "chocolate") {

        recomendacion = `
            <h3>🍫 ¡Tenemos tu combinación!</h3>
            <p>Te recomendamos nuestras Fresitas Especiales con chispas de chocolate y brownie.</p>
            <p><strong>Precio sugerido: $13.500</strong></p>
            <p>¡Una combinación perfecta para los amantes del chocolate! 💗
        `;

    } else if (gusto === "dulce") {

        recomendacion = `
            <h3>🍬 ¡Algo muy dulce para ti!</h3>
            <p>Te recomendamos unas Fresitas Premium con Oreo y gomitas.</p>
            <p><strong>Precio sugerido: $14.500</strong></p>
            <p>¡Un antojito lleno de sabor y dulzura! 🍓</p>
        `;

    } else if (gusto === "clasico") {

        recomendacion = `
            <h3>🍓 ¡Lo clásico nunca falla!</h3>
            <p>Te recomendamos nuestras Fresitas Clásicas.</p>
            <p><strong>Precio: $8.000</strong></p>
            <p>Fresas frescas con nuestra deliciosa crema. 💗</p>
        `;

    } else if (gusto === "especial") {

        recomendacion = `
            <h3>✨ ¡Algo especial para ti!</h3>
            <p>Te recomendamos nuestras Fresitas Premium con brownie y Oreo.</p>
            <p><strong>Precio sugerido: $15.500</strong></p>
            <p>¡Una experiencia deliciosa! 🍓</p>
        `;
    }

    respuesta.innerHTML = recomendacion;
}
