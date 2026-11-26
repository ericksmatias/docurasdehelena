/* ===========================================================
   Doçuras de Helena — comanda (carrinho), busca, opções do
   produto, vídeo do hero e easter egg. Tudo em um arquivo.
   =========================================================== */

// >>> TROQUE AQUI o número do WhatsApp (DDI + DDD + número, só dígitos)
const WHATSAPP = "5588993244048";
const NOME_LOJA = "Doçuras de Helena";

// >>> Produtos: nome, tipos de cobertura. Edite aqui.
const PRODUTOS = [
  { id: "chocolate",   nome: "Bolo de Chocolate", path: "produtos/bolo-de-chocolate/", img: "produto-chocolate.avif", coberturas: ["Chocolate", "Dois amores"] },
  { id: "coco",        nome: "Bolo de Coco",      path: "produtos/bolo-de-coco/",      img: "produto-coco.avif",      coberturas: ["Quebra-queijo"] },
  { id: "cenoura",     nome: "Bolo de Cenoura",   path: "produtos/bolo-de-cenoura/",   img: "produto-cenoura.avif",   coberturas: ["Chocolate"] },
  { id: "milho",       nome: "Bolo de Milho",     path: "produtos/bolo-de-milho/",     img: "produto-milho.avif",     coberturas: ["Curau", "Goiabada"] },
  { id: "formigueiro", nome: "Bolo Formigueiro",  path: "produtos/bolo-formigueiro/",  img: "produto-formigueiro.avif", coberturas: ["Chocolate", "Creme de baunilha"] },
  { id: "aipim",       nome: "Bolo de Aipim",     path: "produtos/bolo-de-aipim/",     img: "produto-aipim.avif",     coberturas: ["Cobertura cremosa de coco"] },
  { id: "fuba",        nome: "Bolo de Fubá",      path: "produtos/bolo-de-fuba/",      img: "produto-fuba.avif",      coberturas: ["Goiabada"] },
  { id: "bolo-mole",   nome: "Bolo Mole",         path: "produtos/bolo-mole/",         img: "produto-bolo-mole.avif", coberturas: ["Caramelo"] },
  { id: "laranja",     nome: "Bolo de Laranja",   path: "produtos/bolo-de-laranja/",   img: "produto-laranja.avif",   coberturas: ["Cobertura cremosa de laranja"] },
];

// Doces fora do catálogo de bolos (só busca/links; não entram na comanda). Edite aqui.
const OUTROS = [
  { id: "pote",     nome: "Delícias no pote", desc: "ninho com uvas morangos brigadeiro intenso doce de leite pote", img: "doce-pote.avif" },
  { id: "caixetas", nome: "Caixetas", desc: "floresta negra chocolate cereja doce de leite coco chocolate branco caixeta", img: "doce-caixeta.avif" },
  { id: "pudim",    nome: "Pudim de leite", desc: "pudim cremoso", img: "doce-pudim.avif" },
  { id: "finos",    nome: "Bem casados e docinhos finos", desc: "brigadeiro brulée paçoca noir bem casado casamento festa doce fino", img: "doce-fino-bemcasado.avif" },
  { id: "naked",      nome: "Naked cake Red Velvet", desc: "naked cake red velvet bolo especial aniversario morango festa", img: "doce-naked-red-velvet.avif" },
  { id: "devils",     nome: "Devil's food cake", desc: "devils food cake bolo de chocolate amargo morango aniversario festa", img: "doce-devils-food.avif" },
  { id: "torta-maca", nome: "Torta de maçã", desc: "torta de maca tortinha tortinhas maçã", img: "doce-torta-maca.avif" },
  { id: "macarons", nome: "Macarons", desc: "macarons doce sobremesa festa", img: "doce-macarons.avif" },
  { id: "tiramisu", nome: "Tiramisu", desc: "tiramisu doce sobremesa festa", img: "doce-tiramisu.avif" },
  { id: "zabaione", nome: "Zabaione", desc: "zabaione doce sobremesa festa", img: "doce-zabaione.avif" },
  { id: "cannoli", nome: "Cannoli", desc: "cannoli doce sobremesa festa", img: "doce-cannoli.avif" },
  { id: "travesseiro-sintra", nome: "Travesseiro de Sintra", desc: "travesseiro de sintra doce sobremesa festa", img: "doce-travesseiro-sintra.avif" },
  { id: "toucinho-do-ceu", nome: "Toucinho do céu", desc: "toucinho do céu doce sobremesa festa", img: "doce-toucinho-do-ceu.avif" },
  { id: "pastel-de-nata", nome: "Pastel de nata", desc: "pastel de nata doce sobremesa festa", img: "doce-pastel-de-nata.avif" },
  { id: "charlotte", nome: "Charlotte", desc: "charlotte doce sobremesa festa", img: "doce-charlotte.avif" },
];

const ROOT = document.documentElement.dataset.root || "./";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

/* ---------- comanda (localStorage) ---------- */
const KEY = "dh_comanda_v1";
const lerComanda = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
const salvarComanda = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} atualizarContador(); renderComanda(); };
function adicionar(item) {
  const c = lerComanda();
  const igual = c.find(i => i.id === item.id && i.cob === item.cob && i.tipo === item.tipo);
  igual ? (igual.qtd += item.qtd) : c.push(item);
  salvarComanda(c);
}
function atualizarContador() {
  const n = lerComanda().reduce((s, i) => s + i.qtd, 0);
  $$("[data-cart-count]").forEach(e => { e.textContent = n; e.classList.toggle("on", n > 0); });
}
function descricao(i) {
  return i.cob === "sem" ? "Sem cobertura" : "Com cobertura" + (i.tipo ? ": " + i.tipo : "");
}
function textoComanda(itens, nome, data, obs) {
  const L = [];
  L.push("Olá! Vim pelo site da " + NOME_LOJA + " e gostaria de fazer este pedido:", "", "*COMANDA - " + NOME_LOJA + "*", "------------------------------");
  if (nome) L.push("*Cliente:* " + nome);
  if (data) L.push("*Data desejada:* " + data);
  L.push("", "*Itens*");
  itens.forEach((i, n) => {
    L.push((n + 1) + ") " + i.qtd + "x " + i.nome + " (20 cm)", "    - " + descricao(i));
  });
  L.push("", "------------------------------");
  if (obs) L.push("", "*Obs:* " + obs);
  L.push("", "Aguardo a confirmação. Obrigado(a)!");
  return L.join("\n");
}
const linkWA = texto => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
// Abre o WhatsApp (aba nova; se o navegador bloquear, abre na mesma aba)
function abrirWA(url) { const w = window.open(url, "_blank"); if (w) { w.opener = null; } else { window.location.href = url; } }
const SAUDACAO = "Olá! Vim pelo site da Doçuras de Helena e gostaria de fazer uma encomenda.\n\nPara agilizar, já vou informando:\n• Sabor do bolo:\n• Com ou sem cobertura (e qual):\n• Quantidade:\n• Data desejada:\n• Retirada ou entrega:";

function renderComanda() {
  const box = $("[data-cart-items]"); if (!box) return;
  const c = lerComanda();
  if (!c.length) { box.innerHTML = '<p class="Loja_Vazio">Sua comanda está vazia.<br>Escolha um bolo para começar.</p>'; $("[data-cart-send]").classList.add("off"); return; }
  box.innerHTML = c.map((i, n) => `
    <div class="Loja_Item">
      <img src="${ROOT}assets/img/${(PRODUTOS.find(p => p.id === i.id) || {}).img || ""}" alt="">
      <div class="Loja_Item_Info">
        <strong>${i.nome}</strong>
        <span>${descricao(i)}</span>
        <div class="Loja_Qtd">
          <button type="button" data-dec="${n}" aria-label="Diminuir">−</button><b>${i.qtd}</b><button type="button" data-inc="${n}" aria-label="Aumentar">+</button>
          <button type="button" class="Loja_Remover" data-rem="${n}">remover</button>
        </div>
      </div>
    </div>`).join("");
  $("[data-cart-send]").classList.remove("off");
}

/* ---------- abrir / fechar painéis ---------- */
function painel(nome, abrir) {
  const el = $("[data-panel='" + nome + "']"), ov = $("[data-overlay]");
  if (!el) return;
  el.classList.toggle("open", abrir); ov.classList.toggle("open", abrir);
  document.body.classList.toggle("Loja_Travado", abrir);
  if (window.lenis) abrir ? window.lenis.stop() : window.lenis.start();
  if (abrir && nome === "search") setTimeout(() => $("[data-search-input]").focus(), 120);
}
function fecharTudo() { $$("[data-panel]").forEach(p => p.classList.remove("open")); $("[data-overlay]").classList.remove("open"); document.body.classList.remove("Loja_Travado"); if (window.lenis) window.lenis.start(); }

document.addEventListener("click", e => {
  const t = e.target.closest("button, a, [data-overlay]"); if (!t) return;
  if (t.matches("[data-action='open-cart']")) { e.preventDefault(); renderComanda(); painel("cart", true); }
  else if (t.matches("[data-action='open-search']")) { e.preventDefault(); painel("search", true); }
  else if (t.matches("[data-close], [data-overlay]")) { fecharTudo(); }
  else if (t.matches("[data-gatito]")) { e.preventDefault(); $("[data-modal-gatito]").classList.add("open"); }
  else if (t.matches("[data-modal-close]")) { $("[data-modal-gatito]").classList.remove("open"); }
  else if (t.dataset.inc != null || t.dataset.dec != null || t.dataset.rem != null) {
    const c = lerComanda();
    if (t.dataset.inc != null) c[t.dataset.inc].qtd++;
    if (t.dataset.dec != null) c[t.dataset.dec].qtd = Math.max(1, c[t.dataset.dec].qtd - 1);
    if (t.dataset.rem != null) c.splice(t.dataset.rem, 1);
    salvarComanda(c);
  }
  else if (t.matches("[data-cart-send]")) {
    e.preventDefault(); const c = lerComanda(); if (!c.length) return;
    const nome = $("[data-cart-nome]").value.trim(), data = $("[data-cart-data]").value.trim(), obs = $("[data-cart-obs]").value.trim();
    abrirWA(linkWA(textoComanda(c, nome, data, obs)));
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { fecharTudo(); const m = $("[data-modal-gatito]"); m && m.classList.remove("open"); } });

/* ---------- busca (lupa) ---------- */
const semAcento = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function buscar(q) {
  const out = $("[data-search-results]"); q = semAcento(q.trim());
  const bolos = PRODUTOS.filter(p => !q || semAcento(p.nome + " " + p.coberturas.join(" ")).includes(q));
  const outros = OUTROS.filter(o => !q || semAcento(o.nome + " " + o.desc).includes(q));
  const html = bolos.map(p => `
    <a class="Loja_Res" href="${ROOT}${p.path}"><img src="${ROOT}assets/img/${p.img}" alt=""><span><strong>${p.nome}</strong><small>Bolo</small></span></a>`).concat(outros.map(o => `
    <a class="Loja_Res" href="${ROOT}bolos/#${o.id}"><img src="${ROOT}assets/img/${o.img}" alt=""><span><strong>${o.nome}</strong><small>Sob encomenda</small></span></a>`));
  out.innerHTML = html.length ? html.join("")
    : '<p class="Loja_Vazio">Nada encontrado.<br>Fale com a gente: pode ser um doce sob encomenda!</p>';
}
const campoBusca = $("[data-search-input]");
if (campoBusca) { campoBusca.addEventListener("input", () => buscar(campoBusca.value)); buscar(""); }

/* ---------- opções do produto (página do bolo) ---------- */
const form = $("[data-loja-form]");
if (form) {
  const prod = PRODUTOS.find(p => p.id === form.dataset.lojaForm);
  const estado = { cob: "com", tipo: prod.coberturas[0], qtd: 1 };
  const btnAdd = $("[data-add]", form), tipoBox = $("[data-tipo-group]", form), qtdEl = $("[data-qtd]", form);
  const atualizar = () => {
    $$("[data-cob]", form).forEach(b => { const on = b.dataset.cob === estado.cob; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    $$("[data-tipo]", form).forEach(b => { const on = b.dataset.tipo === estado.tipo; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    tipoBox.hidden = estado.cob === "sem";
    qtdEl.textContent = estado.qtd;
  };
  form.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.cob) estado.cob = b.dataset.cob;
    if (b.dataset.tipo) estado.tipo = b.dataset.tipo;
    if (b.dataset.mais != null) estado.qtd = Math.min(99, estado.qtd + 1);
    if (b.dataset.menos != null) estado.qtd = Math.max(1, estado.qtd - 1);
    const item = () => ({ id: prod.id, nome: prod.nome, cob: estado.cob, tipo: estado.cob === "sem" ? "" : estado.tipo, qtd: estado.qtd });
    if (b.matches("[data-add]")) { adicionar(item()); b.classList.add("ok"); setTimeout(() => b.classList.remove("ok"), 900); renderComanda(); painel("cart", true); }
    if (b.matches("[data-now]")) abrirWA(linkWA(textoComanda([item()], "", "", "")));
    atualizar();
  });
  atualizar();
}

/* ---------- vídeo do hero (avança com a rolagem) ---------- */
const hv = $("[data-hero-video]");
if (hv && hv.getAttribute("data-hero-video")) {
  // Hero: sequência de quadros em <canvas> presa na tela enquanto o vídeo "roda" na rolagem.
  // Leve de propósito: no celular usa menos quadros, já recortados em vertical (pouca memória),
  // só redesenha quando o quadro muda e não recalcula nada quando a barra do Safari sobe/desce.
  // A rolagem já é suavizada pelo Lenis, então aqui NÃO há segunda suavização (antes havia, e
  // isso deixava o vídeo "pesado" e atrasado em relação ao dedo/mouse).
  const movel = window.innerWidth <= 768;
  const TOTAL = movel ? 48 : 96, pasta = ROOT + "assets/video/" + (movel ? "frames-m/" : "frames/");
  const cv = document.createElement("canvas");
  cv.className = "Hero_Video"; cv.width = movel ? 400 : 1024; cv.height = movel ? 720 : 576;
  if (movel) cv.style.objectPosition = "center";
  hv.replaceWith(cv);
  const ctx = cv.getContext("2d", { alpha: false });
  const secao = cv.closest("section") || cv.parentElement;
  const wrap = cv.closest(".Hero_Wrapper") || secao;
  const img = $("img", cv.parentElement);
  let extra = 1, topo = 0, larg = window.innerWidth, altBase = window.innerHeight;
  wrap.style.position = "sticky"; wrap.style.top = "0";
  const medir = () => {
    extra = Math.round(altBase * 1.6);
    secao.style.height = (wrap.offsetHeight + extra) + "px";
    topo = secao.getBoundingClientRect().top + window.scrollY;
  };
  medir();
  let tRes;
  window.addEventListener("resize", () => {             // ignora a barra do Safari (muda só a altura)
    if (window.innerWidth === larg) return;
    clearTimeout(tRes);
    tRes = setTimeout(() => { larg = window.innerWidth; altBase = window.innerHeight; medir(); if (window.ScrollTrigger) ScrollTrigger.refresh(); pedir(); }, 250);
  });
  const quadros = new Array(TOTAL);
  let desenhado = -1, rodando = false;
  const carregar = i => {
    const im = new Image(); im.decoding = "async";
    im.onload = () => { quadros[i] = im; if (i === 0) { cv.classList.add("on"); if (img) img.style.opacity = "0"; } pedir(); };
    im.src = pasta + "f" + String(i + 1).padStart(3, "0") + ".webp";
  };
  // O primeiro quadro carrega já; o resto só depois da introdução em vídeo terminar, para o
  // intro.mp4 ter toda a banda da conexão e começar a tocar sem atraso.
  let prox = 1, iniciado = false;
  const lote = () => { for (let k = 0; k < 4 && prox < TOTAL; k++) carregar(prox++); if (prox < TOTAL) setTimeout(lote, 80); };
  const iniciarLote = () => { if (iniciado) return; iniciado = true; lote(); };
  carregar(0);
  if (document.getElementById("intro-overlay") && !window.__introFim) {
    window.addEventListener("intro:fim", iniciarLote, { once: true });
    setTimeout(iniciarLote, 9000);                      // segurança: nunca deixa de carregar
  } else iniciarLote();
  const desenhar = () => {
    rodando = false;
    const alvo = Math.min(1, Math.max(0, (window.scrollY - topo) / extra)) * (TOTAL - 1);
    let i = Math.round(alvo);
    while (i > 0 && !quadros[i]) i--;                    // se o quadro ainda não chegou, usa o anterior
    if (quadros[i] && i !== desenhado) { ctx.drawImage(quadros[i], 0, 0, cv.width, cv.height); desenhado = i; }
  };
  function pedir() { if (!rodando) { rodando = true; requestAnimationFrame(desenhar); } }
  window.addEventListener("scroll", pedir, { passive: true });
  pedir();
}

atualizarContador(); renderComanda();

/* ---------- formulários que viram mensagem de WhatsApp (casamento, contato) ---------- */
$$("[data-wa-form]").forEach(f => f.addEventListener("submit", e => {
  e.preventDefault();
  const L = ["*" + (f.dataset.waTitulo || "MENSAGEM") + " - " + NOME_LOJA + "*", "------------------------------"];
  $$("input, textarea, select", f).forEach(el => { if (el.name && el.value.trim()) L.push("*" + el.name + ":* " + el.value.trim()); });
  L.push("", "Enviado pelo site. Aguardo retorno, obrigado(a)!");
  abrirWA(linkWA(L.join("\n")));
}));

/* ---------- botão flutuante do WhatsApp (todas as páginas) ---------- */
(function () {
  const fab = document.createElement("a");
  fab.className = "Loja_FAB"; fab.target = "_blank"; fab.rel = "noopener"; fab.setAttribute("aria-label", "Falar com a gente");
  fab.href = linkWA(SAUDACAO);
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.12c-.25.69-1.44 1.32-1.98 1.37-.51.05-1.15.07-1.85-.12-.43-.13-.98-.32-1.69-.62-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.39 1.47.3.15.47.12.65-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.49.22.57.34.07.13.07.74-.18 1.43z"/></svg>';
  document.body.appendChild(fab);
})();

/* ---------- popups dos bolos da home ---------- */
// No computador é só CSS (hover/foco). No celular, o 1º toque na foto mostra os popups e o 2º abre o bolo
// (o nome do bolo e o botão "Escolher opções" continuam abrindo direto).
(() => {
  const wraps = $$(".Peek");
  if (!wraps.length || !window.matchMedia("(hover: none)").matches) return;
  let atual = null, timer;
  const fechar = () => { clearTimeout(timer); if (atual) atual.classList.remove("is-peek"); atual = null; };
  wraps.forEach(w => w.addEventListener("click", e => {
    if (!e.target.closest(".Product_Item_Image") || w.classList.contains("is-peek")) return;
    e.preventDefault(); e.stopPropagation();
    fechar(); w.classList.add("is-peek"); atual = w; timer = setTimeout(fechar, 4000);
  }, true));
  document.addEventListener("click", e => { if (atual && !atual.contains(e.target)) fechar(); }, true);
})();
