
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

    const nombre = document.getElementById("nombrePedido").value.trim();
    const telefono = document.getElementById("telefonoPedido").value.trim();

    if (!nombre || !telefono) {
        alert("Por favor, escribe tu nombre y teléfono antes de continuar 💗");
        return;
    }

    // VALIDAR TELÉFONO: EXACTAMENTE 10 DÍGITOS

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

    // Limpiar mensajes anteriores.
    mensajeContacto.textContent = "";
    mensajeContacto.className = "";

    // Validar teléfono.
    if (!/^[0-9]{10}$/.test(telefono)) {
        mensajeContacto.textContent =
            "Por favor, ingresa un número de teléfono válido de 10 dígitos 💗";
        mensajeContacto.className = "mensaje-contacto error";
        return;
    }

    // Validar campos.
    if (!nombre || !pedido) {
        mensajeContacto.textContent =
            "Por favor, completa todos los campos 💗";
        mensajeContacto.className = "mensaje-contacto error";
        return;
    }

    // Mostrar mensaje mientras se guarda.
    mensajeContacto.textContent =
        "Estamos registrando tu solicitud... 🍓";
    mensajeContacto.className = "mensaje-contacto";

    // Abrir una ventana para evitar que el navegador bloquee WhatsApp.
    const ventana = window.open("about:blank", "_blank");

    // Guardar consulta en Supabase.
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

    // Preparar mensaje de WhatsApp.
    const mensaje =
        "🍓 ¡Hola Fresilove! Tengo una solicitud:\n\n" +
        "Nombre: " + nombre + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Pedido: " + pedido + "\n\n" +
        "¡Muchas gracias! 💗";

    const numero = "573182269222";

    const enlace = "https://wa.me/" + numero +
        "?text=" + encodeURIComponent(mensaje);

    // Mostrar confirmación.
    mensajeContacto.textContent =
        "¡Tu solicitud se guardó correctamente! Ahora puedes continuar por WhatsApp 💗🍓";

    mensajeContacto.className = "mensaje-contacto exito";

    // Abrir WhatsApp.
    if (ventana) {
        ventana.location.href = enlace;
    } else {
        window.location.href = enlace;
    }

    // Limpiar formulario.
    event.target.reset();
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

// Evita insertar texto de pedidos como código HTML.
function escaparHTML(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caracter]);
}

// Mostrar el inicio de sesión.
function mostrarLogin() {
    loginAdmin.hidden = false;
    panelAdmin.hidden = true;
}

// Mostrar el panel administrativo.
function mostrarPanel() {
    loginAdmin.hidden = true;
    panelAdmin.hidden = false;
}

// Cargar los pedidos desde Supabase.
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

    // Comprobar que la cuenta sea la administradora autorizada.
    if (data.user.id !== ADMIN_UID) {
        await supabaseClient.auth.signOut();
        mensajeLogin.textContent = "Esta cuenta no tiene permiso de administración.";
        return;
    }

    mensajeLogin.textContent = "";
    mostrarPanel();
    await cargarPedidos();
});

// Cambiar el estado de un pedido.
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

// Comprobar si ya existe una sesión iniciada.
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
