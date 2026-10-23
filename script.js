const soles = n => "S/ " + Number(n).toFixed(2);
const contenedor = document.getElementById("carta");
const barra = document.getElementById("pestanas");

const secciones = [menu.nombre, ...categorias.map(c => c.nombre)];

// ---------- MENÚ (igual que antes) ----------
function pintarMenu() {
  contenedor.innerHTML = `
    <div class="menu-wrap">
      <h2>${menu.nombre}</h2>
      <div class="menu-dia">
        <h3>Entradas (a elegir)</h3>
        <ul>${menu.entradas.map(e => `<li><span>${e}</span></li>`).join("")}</ul>
        <h3>Fondos</h3>
        <ul>${menu.fondos.map(f =>
          `<li><span>${f.nombre}</span><span class="precio">${soles(f.precio)}</span></li>`
        ).join("")}</ul>
      </div>
    </div>`;
}

// ---------- CARTA Y BEBIDAS (compacta, 2 columnas parejas) ----------
const linea = p => `
  <li>
    <div class="fila">
      <span class="nombre">${p.nombre}</span>
      <span class="puntos"></span>
      <span class="precio">${soles(p.precio)}</span>
    </div>
    ${p.descripcion ? `<small>${p.descripcion}</small>` : ""}
  </li>`;

const idSec = t => "sec-" + t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

const panel = s =>
  `<section class="panel" id="${idSec(s.titulo)}"><h3>${s.titulo}</h3><ul>${s.platos.map(linea).join("")}</ul></section>`;

// Reparte los bloques en 2 columnas con la MENOR diferencia de altura posible.
// Prueba todas las combinaciones (son pocas) usando las alturas reales medidas.
function mejorReparto(alturas) {
  const n = alturas.length;
  const total = alturas.reduce((a, b) => a + b, 0);
  let mejorMascara = 1, mejorDif = Infinity;
  for (let m = 1; m < (1 << n) - 1; m++) {
    if (!(m & 1)) continue;                       // el primer bloque siempre queda a la izquierda
    let suma = 0;
    for (let i = 0; i < n; i++) if (m & (1 << i)) suma += alturas[i];
    const dif = Math.abs(suma - (total - suma));
    if (dif < mejorDif) { mejorDif = dif; mejorMascara = m; }
  }
  return mejorMascara;
}

const esCelular = () => window.matchMedia("(max-width: 759px)").matches;

// Botones para saltar a cada sección (solo si hay varias)
const saltos = secs => secs.length < 4 ? "" :
  `<nav class="saltos" id="saltos" aria-label="Ir a una sección">` +
  secs.map(s => `<button data-ir="${idSec(s.titulo)}">${s.titulo}</button>`).join("") + `</nav>`;

function armar(secs, izq, der) {
  contenedor.innerHTML = saltos(secs) +
    `<div class="rejilla"><div>${izq.map(panel).join("")}</div><div>${der.map(panel).join("")}</div></div>`;
  const s = document.getElementById("saltos");
  document.documentElement.style.setProperty("--sticky", (barra.offsetHeight + (s ? s.offsetHeight : 0) + 8) + "px");
}

function pintarCategoria(cat) {
  const secs = cat.secciones || [{ titulo: cat.nombre, platos: cat.platos }];
  armar(secs, secs, []);                                   // 1) todo en una columna
  if (esCelular() || secs.length < 2 || secs.length > 16) return;
  const alturas = [...contenedor.querySelectorAll(".panel")].map(el => el.offsetHeight + 12);  // 2) se mide
  const mascara = mejorReparto(alturas);                   // 3) se reparte parejo
  armar(secs, secs.filter((_, i) => mascara & (1 << i)), secs.filter((_, i) => !(mascara & (1 << i))));
}

// Clic en un botón de salto: baja suave hasta esa sección
contenedor.addEventListener("click", e => {
  const b = e.target.closest("[data-ir]");
  if (b) document.getElementById(b.dataset.ir).scrollIntoView({ behavior: "smooth", block: "start" });
});

// Datos del local y botón de WhatsApp
function pintarLocal() {
  const mapa = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(local.direccion);
  document.getElementById("local").innerHTML = `
    <h3>Visítanos</h3>
    <p><strong>Dirección:</strong> ${local.direccion}</p>
    <p><strong>Horario:</strong> ${local.horario}</p>
    <p><strong>Teléfono:</strong> <a href="tel:+${local.whatsapp}">${local.telefono}</a></p>
    <a class="boton-mapa" href="${mapa}" target="_blank" rel="noopener">Cómo llegar</a>`;
  const wa = document.getElementById("wa");
  wa.href = "https://wa.me/" + local.whatsapp + "?text=" + encodeURIComponent("Hola, quisiera hacer una consulta.");
  wa.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z"/></svg><span>WhatsApp</span>`;
}

let actual = 0;
function mostrar(indice, subir = true) {
  actual = indice;
  [...barra.children].forEach((b, i) => b.classList.toggle("activa", i === indice));
  if (indice === 0) pintarMenu();
  else pintarCategoria(categorias[indice - 1]);
  if (subir) window.scrollTo({ top: 0 });
}

// Si el ancho cambia entre celular y computadora, se vuelve a repartir
window.matchMedia("(max-width: 759px)").addEventListener("change", () => mostrar(actual, false));

secciones.forEach((nombre, i) => {
  const boton = document.createElement("button");
  boton.textContent = nombre;
  boton.addEventListener("click", () => mostrar(i));
  barra.appendChild(boton);
});

document.documentElement.style.setProperty("--alto-tabs", barra.offsetHeight + "px");
pintarLocal();
mostrar(0);