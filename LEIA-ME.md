# Doçuras de Helena — site vitrine

## Como abrir
Abra **esta pasta** no VS Code e rode o Live Server em `index.html` (a pasta precisa ser a raiz do servidor).

## Estrutura
- `index.html`, `colecoes/`, `paginas/`, `produtos/` → **PT-BR**
- `en/` → **inglês** (`collections/`, `pages/`, `products/`)
- `assets/css`, `assets/js`, `assets/fonts`, `assets/img` (AVIF)
- `_imagens-antigas/` → imagens do site de estudo original, guardadas só para consulta (nada aponta para elas; pode apagar)
- `_fotos-originais-enviadas/` → logo e catálogo que você mandou
- Botão **English / Português** do menu: usa os `<link rel="alternate" hreflang>` do `<head>` de cada página.

## Para trocar (Ctrl+Shift+F no VS Code)
| Procure por | O que é |
|---|---|
| `5500000000000` | número do WhatsApp (DDI+DDD+número, só dígitos) — está nas páginas |
| `(00) 00000-0000` | número exibido no rodapé |
| `Instagram` / `href="#"` no rodapé | link do Instagram |
| `[Depoimento de cliente` | 5 depoimentos placeholder |
| `[Escreva aqui` / `[História` / `[Como` etc. | textos da página Sobre |
| `slot-` | imagens pendentes (veja IMAGENS-PENDENTES.md) |

## Produtos
Os 9 bolos, preços e coberturas estão em cada `produtos/*.html` (e `en/products/*.html`):
- `data-product-info` e `<script type="application/json" id="product-variants-json-…">` → preços em centavos (3000 = R$ 30,00 com cobertura; 2500 = R$ 25,00 sem)
- texto de preço visível (`Product_Price`, `bvs-btn-price`) e cards em `colecoes/bolos.html` / `index.html`
O botão "Pedir no WhatsApp" abre `wa.me/<número>?text=Olá! Gostaria de encomendar: <bolo>`.

## Identidade visual
- Logo no topo: `assets/img/logo-escuro.svg` e `logo-claro.svg` (texto "Doçuras de" em Cormorant + "Helena" em Great Vibes, convertidos em curvas)
- Nome grande do rodapé: fonte Great Vibes (`assets/fonts/GreatVibes-Regular.woff2`, licença OFL)
- Selo da logo (sem fundo preto): `assets/img/selo-logo.avif`
- Abelhinhas: `assets/img/abelha.svg` e favicons `favicon*.png`
- As cores do site (azul-petróleo e rosa) ainda são as do original; para lavanda/creme da logo, edite as variáveis `:root` em `assets/css/style.css`.
