/* ===========================================================
   Doçuras de Helena — comanda (carrinho), busca, opções do
   produto, vídeo do hero e easter egg. Tudo em um arquivo.
   =========================================================== */

// >>> TROQUE AQUI o número do WhatsApp (DDI + DDD + número, só dígitos)
const WHATSAPP = "5517981235987";
const NOME_LOJA = "Doçuras de Helena";

// >>> Produtos: nome, preços (centavos), tipos de cobertura. Edite aqui.
const PRECO_COM = 3000, PRECO_SEM = 2500;
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

const ROOT = document.documentElement.dataset.root || "./";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const brl = c => "R$ " + (c / 100).toFixed(2).replace(".", ",");
const unit = cob => (cob === "sem" ? PRECO_SEM : PRECO_COM);

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
  L.push("*COMANDA - " + NOME_LOJA + "*", "------------------------------");
  if (nome) L.push("*Cliente:* " + nome);
  if (data) L.push("*Data desejada:* " + data);
  L.push("", "*Itens*");
  let total = 0;
  itens.forEach((i, n) => {
    const sub = unit(i.cob) * i.qtd; total += sub;
    L.push((n + 1) + ") " + i.qtd + "x " + i.nome + " (20 cm)", "    - " + descricao(i), "    - " + brl(unit(i.cob)) + " cada = " + brl(sub));
  });
  L.push("", "------------------------------", "*TOTAL: " + brl(total) + "*");
  if (obs) L.push("", "*Obs:* " + obs);
  L.push("", "Aguardo a confirmação. Obrigado(a)!");
  return L.join("\n");
}
const linkWA = texto => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);

function renderComanda() {
  const box = $("[data-cart-items]"); if (!box) return;
  const c = lerComanda();
  if (!c.length) { box.innerHTML = '<p class="Loja_Vazio">Sua comanda está vazia.<br>Escolha um bolo para começar.</p>'; $("[data-cart-total]").textContent = brl(0); $("[data-cart-send]").classList.add("off"); return; }
  box.innerHTML = c.map((i, n) => `
    <div class="Loja_Item">
      <img src="${ROOT}assets/img/${(PRODUTOS.find(p => p.id === i.id) || {}).img || ""}" alt="">
      <div class="Loja_Item_Info">
        <strong>${i.nome}</strong>
        <span>${descricao(i)}</span>
        <span>${brl(unit(i.cob))} cada</span>
        <div class="Loja_Qtd">
          <button type="button" data-dec="${n}" aria-label="Diminuir">−</button><b>${i.qtd}</b><button type="button" data-inc="${n}" aria-label="Aumentar">+</button>
          <button type="button" class="Loja_Remover" data-rem="${n}">remover</button>
        </div>
      </div>
    </div>`).join("");
  $("[data-cart-total]").textContent = brl(c.reduce((s, i) => s + unit(i.cob) * i.qtd, 0));
  $("[data-cart-send]").classList.remove("off");
}

/* ---------- abrir / fechar painéis ---------- */
function painel(nome, abrir) {
  const el = $("[data-panel='" + nome + "']"), ov = $("[data-overlay]");
  if (!el) return;
  el.classList.toggle("open", abrir); ov.classList.toggle("open", abrir);
  document.body.classList.toggle("Loja_Travado", abrir);
  if (abrir && nome === "search") setTimeout(() => $("[data-search-input]").focus(), 120);
}
function fecharTudo() { $$("[data-panel]").forEach(p => p.classList.remove("open")); $("[data-overlay]").classList.remove("open"); document.body.classList.remove("Loja_Travado"); }

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
    window.open(linkWA(textoComanda(c, nome, data, obs)), "_blank", "noopener");
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { fecharTudo(); const m = $("[data-modal-gatito]"); m && m.classList.remove("open"); } });

/* ---------- busca (lupa) ---------- */
function buscar(q) {
  const out = $("[data-search-results]"); q = q.trim().toLowerCase();
  const lista = PRODUTOS.filter(p => !q || (p.nome + " " + p.coberturas.join(" ")).toLowerCase().includes(q));
  out.innerHTML = lista.length ? lista.map(p => `
    <a class="Loja_Res" href="${ROOT}${p.path}"><img src="${ROOT}assets/img/${p.img}" alt=""><span><strong>${p.nome}</strong><small>${brl(PRECO_SEM)} a ${brl(PRECO_COM)}</small></span></a>`).join("")
    : '<p class="Loja_Vazio">Nenhum bolo encontrado.<br>Pergunte pelo WhatsApp: pode ser um doce sob encomenda!</p>';
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
    const total = unit(estado.cob) * estado.qtd;
    $("[data-preco]").textContent = brl(unit(estado.cob));
    btnAdd.querySelector("span").textContent = "Adicionar à comanda · " + brl(total);
  };
  form.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.cob) estado.cob = b.dataset.cob;
    if (b.dataset.tipo) estado.tipo = b.dataset.tipo;
    if (b.dataset.mais != null) estado.qtd = Math.min(99, estado.qtd + 1);
    if (b.dataset.menos != null) estado.qtd = Math.max(1, estado.qtd - 1);
    const item = () => ({ id: prod.id, nome: prod.nome, cob: estado.cob, tipo: estado.cob === "sem" ? "" : estado.tipo, qtd: estado.qtd });
    if (b.matches("[data-add]")) { adicionar(item()); b.classList.add("ok"); setTimeout(() => b.classList.remove("ok"), 900); renderComanda(); painel("cart", true); }
    if (b.matches("[data-now]")) window.open(linkWA(textoComanda([item()], "", "", "")), "_blank", "noopener");
    atualizar();
  });
  atualizar();
}

/* ---------- vídeo do hero (opcional, avança com a rolagem) ---------- */
const hv = $("[data-hero-video]");
if (hv && hv.getAttribute("data-hero-video")) {
  hv.src = ROOT + hv.getAttribute("data-hero-video");
  hv.muted = true; hv.playsInline = true; hv.preload = "auto"; hv.load();
  const secao = hv.closest("section") || hv.parentElement;
  const img = $("img", hv.parentElement);
  hv.addEventListener("loadedmetadata", () => { hv.classList.add("on"); if (img) img.style.opacity = "0"; hv.pause(); });
  let alvo = 0;
  const loop = () => {
    if (hv.duration) {
      const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, secao.offsetHeight)));
      alvo = p * hv.duration;
      if (Math.abs(hv.currentTime - alvo) > 0.01) hv.currentTime += (alvo - hv.currentTime) * 0.35;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

atualizarContador(); renderComanda();
