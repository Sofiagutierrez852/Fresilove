
// 🍓 CONEXIÓN CON SUPABASE

const SUPABASE_URL = "https://krsofdxpmmyfsaggjzlq.supabase.co";

// Conserva tu clave Publishable de Supabase.
// No uses la clave Secret.

const SUPABASE_KEY = "sb_publishable_AE4HURLhArZKbozwZCzwXg_PhlzsdJH";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("🍓 Fresilove conectado con Supabase");


// 🍓 FUNCIÓN PARA GUARDAR PEDIDOS

async function guardarPedido(datos) {

    const { error } = await supabaseClient
        .from("pedidos")
        .insert({
            nombre_cliente: datos.nombreCliente || "Cliente web",
            telefono: datos.telefono || "",
            notas: datos.notas,
            total: Number(datos.total) || 0,
            estado: datos.estado || "nuevo"
        });

    if (error) {
        console.error("Error al guardar el pedido:", error);
        alert("No pudimos guardar tu pedido. Inténtalo nuevamente.");
        return false;
    }

    console.log("🍓 ¡Pedido guardado correctamente!");
    return true;
}


// 🍓 SELECCIONAR PRODUCTO DEL CATÁLOGO

async function seleccionarProducto(producto, precio) {

    const nombre = document.getElementById("nombre")?.value.trim() || "Cliente web";
    const telefono = document.getElementById("telefono")?.value.trim() || "";

    const ventana = window.open("about:blank", "_blank");

    const guardado = await guardarPedido({
        nombreCliente: nombre,
        telefono: telefono,
        notas: "Producto: " + producto,
        total: precio
    });

    if (!guardado) {
        if (ventana) ventana.close();
        return;
    }

    const mensaje =
        "🍓 ¡Hola Fresilove! Quiero pedir:\n\n" +
        "Producto: " + producto + "\n" +
        "Precio: $" + precio.toLocaleString("es-CO") + "\n\n" +
        "¡Muchas gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    if (ventana) {
        ventana.location.href = enlace;
    } else {
        window.location.href = enlace;
    }
}


// 🍓 ACTUALIZAR TOTAL

function actualizarTotal() {

    const selectorTamano = document.getElementById("tamano");

    if (!selectorTamano) return;

    let total = Number(selectorTamano.value);

    const toppings = document.querySelectorAll(".topping:checked");

    toppings.forEach(function(topping) {
        total += Number(topping.value);
    });

    document.getElementById("total").textContent =
        "Total: $" + total.toLocaleString("es-CO");
}


const selectorTamano = document.getElementById("tamano");

if (selectorTamano) {
    selectorTamano.addEventListener("change", actualizarTotal);
}

document.querySelectorAll(".topping").forEach(function(topping) {
    topping.addEventListener("change", actualizarTotal);
});


// 🍓 CREAR PEDIDO PERSONALIZADO

async function crearPedido() {

    actualizarTotal();

    const tamano = document.getElementById("tamano");

    if (!tamano) {
        alert("No encontramos el selector de tamaño.");
        return;
    }

    // Obtener los datos del cliente

    const nombre = document.getElementById("nombrePedido").value.trim();
    const telefono = document.getElementById("telefonoPedido").value.trim();

    if (!nombre || !telefono) {
        alert("Por favor, escribe tu nombre y teléfono antes de continuar 💗");
        return;
    }

    const nombreTamano = tamano.options[tamano.selectedIndex].text;

    const toppings = document.querySelectorAll(".topping:checked");

    let listaToppings = "";

    toppings.forEach(function(topping) {
        listaToppings += "• " + topping.parentElement.textContent.trim() + "\n";
    });

    if (listaToppings === "") {
        listaToppings = "Sin toppings adicionales";
    }

    const precioTamano = Number(tamano.value);

    let totalNumerico = precioTamano;

    toppings.forEach(function(topping) {
        totalNumerico += Number(topping.value);
    });

    const notas =
        "Tamaño: " + nombreTamano + "\n\n" +
        "Toppings:\n" + listaToppings;

    const ventana = window.open("about:blank", "_blank");

    const guardado = await guardarPedido({
        nombreCliente: nombre,
        telefono: telefono,
        notas: notas,
        total: totalNumerico
    });

    if (!guardado) {
        if (ventana) ventana.close();
        return;
    }

    const mensaje =
        "🍓 ¡Hola Fresilove! Quiero hacer este pedido:\n\n" +
        "Nombre: " + nombre + "\n" +
        "Teléfono: " + telefono + "\n\n" +
        "Tamaño: " + nombreTamano + "\n\n" +
        "Toppings:\n" + listaToppings + "\n" +
        "Total: $" + totalNumerico.toLocaleString("es-CO") +
        "\n\n¡Gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    if (ventana) {
        ventana.location.href = enlace;
    } else {
        window.location.href = enlace;
    }
}


// 🍓 FORMULARIO DE CONTACTO

async function enviarFormulario(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const pedido = document.getElementById("pedido").value;

    const guardado = await guardarPedido({
        nombreCliente: nombre,
        telefono: telefono,
        notas: pedido,
        total: 0,
        estado: "consulta"
    });

    if (!guardado) return;

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


// 🍓 ASISTENTE FRESILOVE

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
            <p>¡Una combinación perfecta para los amantes del chocolate! 💗</p>
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
