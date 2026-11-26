# Doçuras de Helena — site vitrine

## Abrir no VS Code
Abra **esta pasta** e rode o Live Server em `index.html`. As páginas usam URLs limpas (`/bolos/`, `/sobre/`, `/produtos/bolo-de-chocolate/`), então funciona igual no GitHub Pages. O arquivo `.nojekyll` precisa ir junto no deploy.

## Onde mudar cada coisa
| O quê | Onde |
|---|---|
| Número do WhatsApp, nomes e coberturas dos bolos, texto da comanda | `assets/js/loja.js` (topo do arquivo: `WHATSAPP`, `PRODUTOS`) |
| Número no rodapé e botões de WhatsApp das páginas | busque `5588993244048` e `99324-4048` (Ctrl+Shift+F) |
| Logos do iFood e 99Food | `assets/img/ifood.png` e `assets/img/99food.png` (troque pelos PNG oficiais, mesmo nome; o 99Food é um provisório) |
| Mensagens do WhatsApp (formulários de Casamento e Contato) | `assets/js/loja.js` (final do arquivo) e os `data-wa-titulo` no HTML |
| Instagram | busque `docurasde_helena` |
| Textos das páginas | cada `index.html` dentro das pastas |
| Cores | `assets/css/style.css`, bloco `:root` (`--blue` lavanda, `--pink` amarelo manteiga, `--dark` ameixa, `--beige` creme) |
| Botões, comanda, busca, mobile | `assets/css/loja.css` |

## Como funciona o pedido
Na página do bolo: escolhe **com/sem cobertura**, **qual cobertura** e a quantidade → **Adicionar à comanda** (ícone da sacola no topo) ou **Pedir agora**. Na comanda o cliente informa nome, data e observações e toca em **Enviar pedido no WhatsApp**, que abre a conversa com a comanda pronta. A comanda fica salva no navegador (localStorage). A lupa filtra os 9 bolos.

## Vídeo do hero (rolagem)
O hero não usa mais um arquivo de vídeo: são quadros em `assets/video/frames/` (PC, 96 quadros) e `assets/video/frames-m/` (celular, 48 quadros recortados na vertical), desenhados em canvas conforme a rolagem. Para trocar o vídeo, gere de novo os quadros com ffmpeg (`f001.webp`, `f002.webp`...) mantendo a quantidade, ou ajuste `TOTAL` no bloco do hero em `assets/js/loja.js`. O atributo `data-hero-video` no `index.html` só precisa estar preenchido para ativar o efeito.

## Easter egg
Clicar em "Desenvolvido por Erick Matias" (rodapé de qualquer página) abre o gatito. Arquivo: `assets/img/gatito.gif` (1 MB; se quiser, comprima).

## Pastas
`assets/` (imagens, fontes, css, js, quadros do hero), `bolos/`, `produtos/`, `casamento/`, `sobre/`, `contato/` (páginas em português com URL limpa), Fotos em alta qualidade para refinar ficam fora do projeto.

---
## v5 — o que mudou
- **Foto do WhatsApp/Instagram:** todas as páginas têm as tags de compartilhamento; cada bolo tem a própria imagem em `assets/img/og/`. **Antes de publicar, rode uma vez:** `node definir-endereco.mjs https://seudominio.com.br` (grava o endereço real, cria `sitemap.xml` e `robots.txt`). Depois de publicar, se o WhatsApp mostrar a imagem antiga, teste com um link novo (ex.: acrescente `?v=2`) — ele guarda o preview em cache.
- **Vídeo de abertura:** nunca é cortado, toca mudo/automático, tenta de novo no 1º toque se o navegador bloquear e pula sozinho em ~2,5 s se não tocar. Os quadros pesados do hero só carregam depois dele.
- **Sem preços** em nenhum lugar (inclusive dados escondidos no código). Textos sem "atende só pelo WhatsApp"; o WhatsApp continua sendo o destino dos botões de pedido e aparece como contato no rodapé.
- **Rolagem:** removido o recálculo de layout a cada rolagem (era a maior causa de lag), segunda suavização do hero, espera de 0,8 s ao tocar em links no celular e rolagem "vazando" por trás do carrinho/menu.
- **Textos vazando:** títulos agora acompanham a largura da tela e a divisão em linhas usa o layout real do navegador.
- A seção de depoimentos (textos de exemplo) está comentada em `index.html`; reative quando tiver depoimentos reais.

## v6
- Prateleira da Felicidade ganhou: Naked cake Red Velvet, Devil's food cake e Torta de maçã (fotos em `assets/img/doce-*.avif`; também aparecem na busca do site).

## v7
- Endereço definido: https://docurasdehelena.com.br (tags de compartilhamento, canonical, sitemap.xml e robots.txt já gerados). Se mudar o domínio, rode de novo `node definir-endereco.mjs https://novo-endereco`.
- Popups nos bolos da home (`.Peek_Tags` em `index.html`, estilo no fim de `assets/css/custom.css`): 3 etiquetas por bolo, aparecem com mouse/dedo + zoom bem leve (1,035). Para trocar os textos, edite os `<li class="Peek_Tag">`. Para reposicionar sobre as fotos sem fundo, ajuste `top/left/right` de `.t1`, `.t2` e `.t3`.

## v8
- Fotos de estúdio novas substituíram as de baixa qualidade (home, páginas de produto, Prateleira, Sobre).
- Bolos da home: recortes sem fundo (PNG transparente em AVIF) feitos a partir das fotos novas; coco recortado da foto de estúdio do bolo com cobertura branca.
- Prateleira da Felicidade: +8 doces (Macarons, Tiramisu, Zabaione, Cannoli, Travesseiro de Sintra, Toucinho do céu, Pastel de nata, Charlotte), também na busca.
- Fotos originais têm 382x512 px: foram ampliadas; se tiver versões maiores, é só trocar o arquivo com o mesmo nome em assets/img.

## v8.1
- Removida a animação de vídeo de abertura (intro.mp4 e poster apagados): o site abre direto.
- Círculo "Peça agora": não fica mais na frente do título (menor em telas médias; abaixo do título em celular/tablet).
- Aba Bolos: título "Bolos Caseirinhos" menor no celular, sem vazar da tela.
