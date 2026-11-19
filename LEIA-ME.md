# Doçuras de Helena — site vitrine

## Abrir no VS Code
Abra **esta pasta** e rode o Live Server em `index.html`. As páginas usam URLs limpas (`/bolos/`, `/sobre/`, `/produtos/bolo-de-chocolate/`), então funciona igual no GitHub Pages. O arquivo `.nojekyll` precisa ir junto no deploy.

## Onde mudar cada coisa
| O quê | Onde |
|---|---|
| Número do WhatsApp, preços, nomes e coberturas dos bolos, texto da comanda | `assets/js/loja.js` (topo do arquivo: `WHATSAPP`, `PRECO_COM`, `PRECO_SEM`, `PRODUTOS`) |
| Número no rodapé e botões de WhatsApp das páginas | busque `5517981235987` e `98123-5987` (Ctrl+Shift+F) |
| Instagram | busque `docurasde_helena` |
| Textos das páginas | cada `index.html` dentro das pastas |
| Cores | `assets/css/style.css`, bloco `:root` (`--blue` lavanda, `--pink` amarelo manteiga, `--dark` ameixa, `--beige` creme) |
| Botões, comanda, busca, mobile | `assets/css/loja.css` |

## Como funciona o pedido
Na página do bolo: escolhe **com/sem cobertura**, **qual cobertura** e a quantidade → **Adicionar à comanda** (ícone da sacola no topo) ou **Pedir agora**. Na comanda o cliente informa nome, data e observações e toca em **Enviar pedido no WhatsApp**, que abre a conversa com a comanda pronta. A comanda fica salva no navegador (localStorage). A lupa filtra os 9 bolos.

## Vídeo de 4 s no hero (opcional)
Em `index.html`, procure `data-hero-video=""` e preencha, por exemplo, `data-hero-video="assets/video/hero.mp4"`. O vídeo avança conforme a rolagem e chega ao fim quando o hero sai da tela. Vazio = só a foto. Dicas: MP4 H.264, sem áudio, ~1280 px de largura, até 2 MB, e para rolar suave exporte com um quadro-chave por quadro (`ffmpeg -g 1`).

## Easter egg
Clicar em "Desenvolvido por Erick Matias" (rodapé de qualquer página) abre o gatito. Arquivo: `assets/img/gatito.gif` (1 MB; se quiser, comprima).

## Pastas
`_imagens-antigas/` imagens do site de estudo (pode apagar), `_fotos-originais-enviadas/` logo e catálogo.
