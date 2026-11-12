
// 🍓 CONEXIÓN CON SUPABASE

const SUPABASE_URL = "https://krsofdxpmmyfsaggjzlq.supabase.co";
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
    console.log(
        "🍓 ERROR COMPLETO DE SUPABASE:",
        JSON.stringify(error, null, 2)
    );

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

    const nombre = document.getElementById("nombrePedido").value.trim();
    const telefono = document.getElementById("telefonoPedido").value.trim();

    if (!nombre || !telefono) {
        alert("Por favor, escribe tu nombre y teléfono antes de continuar 💗");
        return;
    }

    if (!/^[0-9]{10}$/.test(telefono)) {
        alert("Tu número de teléfono debe tener exactamente 10 dígitos 💗");
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

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const pedido = document.getElementById("pedido").value.trim();
    const mensajeContacto = document.getElementById("mensajeContacto");

    mensajeContacto.textContent = "";
    mensajeContacto.className = "";

    if (!/^[0-9]{10}$/.test(telefono)) {
        mensajeContacto.textContent =
            "Por favor, ingresa un número de teléfono válido de 10 dígitos 💗";
        mensajeContacto.className = "mensaje-contacto error";
        return;
    }

    if (!nombre || !pedido) {
        mensajeContacto.textContent =
            "Por favor, completa todos los campos 💗";
        mensajeContacto.className = "mensaje-contacto error";
        return;
    }

    mensajeContacto.textContent =
        "Estamos registrando tu solicitud... 🍓";
    mensajeContacto.className = "mensaje-contacto";

    const ventana = window.open("about:blank", "_blank");

    const guardado = await guardarPedido({
        nombreCliente: nombre,
        telefono: telefono,
        notas: pedido,
        total: 0,
        estado: "consulta"
    });

    if (!guardado) {
        if (ventana) ventana.close();

        mensajeContacto.textContent =
            "No pudimos guardar tu solicitud. Inténtalo nuevamente 💗";
        mensajeContacto.className = "mensaje-contacto error";
        return;
    }

    const mensaje =
        "🍓 ¡Hola Fresilove! Tengo una solicitud:\n\n" +
        "Nombre: " + nombre + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Pedido: " + pedido + "\n\n" +
        "¡Muchas gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    mensajeContacto.textContent =
        "¡Tu solicitud se guardó correctamente! Ahora puedes continuar por WhatsApp 💗🍓";

    mensajeContacto.className = "mensaje-contacto exito";

    if (ventana) {
        ventana.location.href = enlace;
    } else {
        window.location.href = enlace;
    }

    event.target.reset();
}


// 🍓 ASISTENTE FRESILOVE

function recomendarFresilove() {

    const gusto = document.getElementById("gusto").value;
    const preferencia = document.getElementById("preferenciaAsistente").value;
    const evitar = document.getElementById("evitarAsistente").value;
    const descripcion = document.getElementById("descripcionAntojo").value.toLowerCase();
    const respuesta = document.getElementById("respuestaAsistente");

    const texto = descripcion
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    let gustoFinal = gusto;

    const precios = {
        chocolate: 1500,
        oreo: 1500,
        brownie: 2000,
        gomitas: 1000
    };

    const ingredientes = ["chocolate", "oreo", "brownie", "gomitas"];

    let ingredientesEvitados = [];

    if (evitar) {
        ingredientesEvitados.push(evitar);
    }

    ingredientes.forEach(function(ingrediente) {

        const expresion = new RegExp(
            "\\b(sin|no quiero|no me gusta|no deseo|evitar|evito|nada de)\\s+(el\\s+|la\\s+|los\\s+|las\\s+)?(" +
            ingrediente + ")\\b"
        );

        if (expresion.test(texto) && !ingredientesEvitados.includes(ingrediente)) {
            ingredientesEvitados.push(ingrediente);
        }
    });

    let textoPositivo = texto;

    ingredientes.forEach(function(ingrediente) {

        const expresion = new RegExp(
            "\\b(sin|no quiero|no me gusta|no deseo|evitar|evito|nada de)\\s+(el\\s+|la\\s+|los\\s+|las\\s+)?(" +
            ingrediente + ")\\b",
            "g"
        );

        textoPositivo = textoPositivo.replace(expresion, " ");
    });

    if (!gustoFinal) {

        if (textoPositivo.includes("oreo")) {
            gustoFinal = "dulce";

        } else if (textoPositivo.includes("chocolate")) {
            gustoFinal = "chocolate";

        } else if (textoPositivo.includes("dulce")) {
            gustoFinal = "dulce";

        } else if (
            textoPositivo.includes("fruta") ||
            textoPositivo.includes("frutal")
        ) {
            gustoFinal = "frutal";

        } else if (
            textoPositivo.includes("especial") ||
            textoPositivo.includes("compartir")
        ) {
            gustoFinal = "especial";

        } else if (textoPositivo.includes("clasico")) {
            gustoFinal = "clasico";
        }
    }

    if (
        !gustoFinal &&
        !preferencia &&
        ingredientesEvitados.length === 0 &&
        !descripcion.trim()
    ) {
        respuesta.textContent =
            "💗 Cuéntanos qué se te antoja o selecciona un sabor para recomendarte algo delicioso.";
        return;
    }

    if (
        !gustoFinal &&
        !preferencia &&
        ingredientesEvitados.length === 0
    ) {
        respuesta.textContent =
            "💗 Cuéntanos un poquito más sobre tu antojo para recomendarte algo delicioso.";
        return;
    }

    if (preferencia && ingredientesEvitados.includes(preferencia)) {
        respuesta.textContent =
            "💗 Has elegido el mismo ingrediente como favorito y como ingrediente que deseas evitar. ¡Cambia una de las opciones!";
        return;
    }

    let nombreBase = "Fresitas medianas";
    let precioBase = 10000;

    if (gustoFinal === "clasico") {
        nombreBase = "Fresitas clásicas";
        precioBase = 8000;
    }

    let toppings = [];

    if (gustoFinal === "chocolate") {
        toppings = ["chocolate", "brownie"];

    } else if (gustoFinal === "dulce") {
        toppings = ["oreo", "gomitas"];

    } else if (gustoFinal === "especial") {
        toppings = ["brownie", "oreo"];

    } else if (gustoFinal === "frutal") {
        toppings = [];
    }

    if (preferencia && precios[preferencia]) {
        if (!toppings.includes(preferencia)) {
            toppings.push(preferencia);
        }
    }

    toppings = toppings.filter(function(topping) {
        return !ingredientesEvitados.includes(topping);
    });

    if (gustoFinal === "clasico") {
        toppings = [];
    }

    let total = precioBase;

    toppings.forEach(function(topping) {
        total += precios[topping];
    });

    const nombres = {
        chocolate: "Chispas de chocolate",
        oreo: "Oreo",
        brownie: "Brownie",
        gomitas: "Gomitas"
    };

    const detalleToppings = toppings.length
        ? toppings.map(function(topping) {
            return nombres[topping];
        }).join(" y ")
        : "Sin toppings adicionales";

    let mensaje = "💗 ¡Preparamos una recomendación para tu antojo!";

    if (gustoFinal === "chocolate") {
        mensaje = "🍫 ¡Una combinación para los amantes del chocolate!";

    } else if (gustoFinal === "dulce") {
        mensaje = "🍬 ¡Una opción llena de dulzura!";

    } else if (gustoFinal === "clasico") {
        mensaje = "🍓 ¡Lo clásico nunca falla!";

    } else if (gustoFinal === "especial") {
        mensaje = "✨ ¡Una combinación especial para consentirte!";

    } else if (gustoFinal === "frutal") {
        mensaje = "🍓 ¡Una opción sencilla y deliciosa!";
    }

    respuesta.textContent =
        mensaje + "\n\n" +
        "Te recomendamos: " + nombreBase + "\n" +
        "Toppings: " + detalleToppings + "\n\n" +
        "Precio de la base: $" + precioBase.toLocaleString("es-CO") + "\n" +
        "Precio de los toppings: $" + (total - precioBase).toLocaleString("es-CO") + "\n" +
        "TOTAL ESTIMADO: $" + total.toLocaleString("es-CO") +
        "\n\n¡Esperamos que disfrutes tus Fresilove! 🍓💗";
}


// ======================================
// 🍓 ADMINISTRACIÓN DE FRESILOVE
// ======================================

const ADMIN_UID = "1ec0eed1-538d-4b99-9917-6b132831746b";

const formularioLogin = document.getElementById("formularioLogin");
const loginAdmin = document.getElementById("loginAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const mensajeLogin = document.getElementById("mensajeLogin");
const mensajePedidos = document.getElementById("mensajePedidos");
const listaPedidos = document.getElementById("listaPedidos");
const cerrarSesion = document.getElementById("cerrarSesion");

function escaparHTML(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caracter]);
}

function mostrarLogin() {
    loginAdmin.hidden = false;
    panelAdmin.hidden = true;
}

function mostrarPanel() {
    loginAdmin.hidden = true;
    panelAdmin.hidden = false;
}

async function cargarPedidos() {
    mensajePedidos.textContent = "Cargando pedidos...";
    listaPedidos.innerHTML = "";

    const { data, error } = await supabaseClient
        .from("pedidos")
        .select("*")
        .order("creado_en", { ascending: false });

    if (error) {
        mensajePedidos.textContent = "No se pudieron cargar los pedidos: " + error.message;
        return;
    }

    if (!data || data.length === 0) {
        mensajePedidos.textContent = "Todavía no hay pedidos registrados 🍓";
        return;
    }

    mensajePedidos.textContent = `Tienes ${data.length} pedido(s) registrados. 💗`;

    listaPedidos.innerHTML = data.map(pedido => `
        <article class="pedido-admin">
            <h3>Pedido #${escaparHTML(pedido.id)}</h3>

            <p><strong>Cliente:</strong> ${escaparHTML(pedido.nombre_cliente)}</p>
            <p><strong>Teléfono:</strong> ${escaparHTML(pedido.telefono)}</p>
            <p><strong>Detalle:</strong> ${escaparHTML(pedido.notas)}</p>
            <p><strong>Total:</strong> $${Number(pedido.total || 0).toLocaleString("es-CO")}</p>
            <p><strong>Estado actual:</strong> ${escaparHTML(pedido.estado)}</p>

            <label for="estado-${escaparHTML(pedido.id)}">
                Cambiar estado:
            </label>

            <select
                class="estado-pedido"
                id="estado-${escaparHTML(pedido.id)}"
                data-id="${escaparHTML(pedido.id)}"
            >
                <option value="nuevo" ${pedido.estado === "nuevo" ? "selected" : ""}>Nuevo</option>
                <option value="preparando" ${pedido.estado === "preparando" ? "selected" : ""}>Preparando</option>
                <option value="listo" ${pedido.estado === "listo" ? "selected" : ""}>Listo</option>
                <option value="entregado" ${pedido.estado === "entregado" ? "selected" : ""}>Entregado</option>
                <option value="cancelado" ${pedido.estado === "cancelado" ? "selected" : ""}>Cancelado</option>
                <option value="consulta" ${pedido.estado === "consulta" ? "selected" : ""}>Consulta</option>
            </select>
        </article>
    `).join("");
}

// Iniciar sesión.
formularioLogin.addEventListener("submit", async function(event) {
    event.preventDefault();

    mensajeLogin.textContent = "Verificando acceso...";

    const correo = document.getElementById("correoAdmin").value.trim();
    const contrasena = document.getElementById("contrasenaAdmin").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: correo,
        password: contrasena
    });

    if (error) {
        mensajeLogin.textContent = "No se pudo iniciar sesión. Revisa tus datos.";
        console.error(error);
        return;
    }

    if (data.user.id !== ADMIN_UID) {
        await supabaseClient.auth.signOut();
        mensajeLogin.textContent = "Esta cuenta no tiene permiso de administración.";
        return;
    }

    mensajeLogin.textContent = "";
    mostrarPanel();
    await cargarPedidos();
});

// Cambiar estado de un pedido.
listaPedidos.addEventListener("change", async function(event) {
    if (!event.target.classList.contains("estado-pedido")) {
        return;
    }

    const idPedido = event.target.dataset.id;
    const nuevoEstado = event.target.value;

    mensajePedidos.textContent = "Actualizando pedido...";

    const { error } = await supabaseClient
        .from("pedidos")
        .update({ estado: nuevoEstado })
        .eq("id", idPedido);

    if (error) {
        mensajePedidos.textContent = "No se pudo actualizar: " + error.message;
        console.error(error);
        return;
    }

    mensajePedidos.textContent = "¡Estado actualizado correctamente! 💗";
    await cargarPedidos();
});

// Cerrar sesión.
cerrarSesion.addEventListener("click", async function() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        mensajePedidos.textContent = "No se pudo cerrar sesión.";
        return;
    }

    formularioLogin.reset();
    mostrarLogin();
});

// Comprobar sesión.
async function comprobarSesionAdmin() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        mostrarLogin();
        return;
    }

    if (data.session.user.id !== ADMIN_UID) {
        await supabaseClient.auth.signOut();
        mostrarLogin();
        return;
    }

    mostrarPanel();
    await cargarPedidos();
}

comprobarSesionAdmin();
