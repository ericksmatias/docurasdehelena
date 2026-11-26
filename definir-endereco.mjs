// Uso (na pasta do site):   node definir-endereco.mjs https://seudominio.com.br
// Grava o endereço real do site nas tags de compartilhamento (foto do WhatsApp, Instagram, Facebook, X),
// no canonical e nos dados do Google, e cria sitemap.xml e robots.txt.
import fs from "node:fs"; import path from "node:path";
let site = (process.argv[2] || "").trim().replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/[\w./-]*)?$/i.test(site)) { console.error("Informe o endereço completo, com https. Ex.: node definir-endereco.mjs https://docurasdehelena.com.br"); process.exit(1); }
const pages = [];
(function walk(d) { for (const n of fs.readdirSync(d)) { const p = path.join(d, n); if (fs.statSync(p).isDirectory()) { if (n !== "assets" && n !== "node_modules") walk(p); } else if (n === "index.html") pages.push(p); } })(".");
let urls = [];
for (const f of pages) {
  let s = fs.readFileSync(f, "utf8");
  // troca o endereço só nas tags de compartilhamento/canonical/JSON-LD (não mexe em wa.me, instagram etc.)
  s = s.replace(/(<link href=")([^"]*)(" rel="canonical"\/>)/, (m, a, u, c) => a + site + u.replace(/^https?:\/\/[^/]+|^__SITE__/, "") + c)
       .replace(/(<meta content=")([^"]*)(" (?:property="og:(?:url|image|image:secure_url)"|name="twitter:image")\/>)/g, (m, a, u, c) => a + site + u.replace(/^https?:\/\/[^/]+|^__SITE__/, "") + c)
       .replace(/("url":")[^"]*(")/, (m, a, c) => a + site + "/" + c)
       .replace(/("image":")[^"]*(")/, (m, a, c) => a + site + "/assets/img/og-image.jpg" + c);
  fs.writeFileSync(f, s);
  const rel = path.relative(".", f).replace(/index\.html$/, "").replace(/\\/g, "/");
  urls.push(site + "/" + rel);
}
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
console.log(`Pronto: ${pages.length} páginas atualizadas para ${site}`);
