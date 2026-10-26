# NEPZERA — e-commerce de demonstração

**No ar:** https://walter-maia.github.io/ecommerce2/

Loja de streetwear autoral da **NEPZERA** (marca fictícia), coleção **ABISSAL — Capítulo 03**. Visual inspirado no padrão das lojas de drop brasileiras: hero em tela cheia antes do cabeçalho, faixa de avisos correndo, packshots em fundo cinza com as costas no hover, preço no Pix em destaque e "Ver tudo" no fim das grades. Marca, peças, pessoas e textos são originais; todas as imagens foram geradas no Higgsfield (ver [`docs/ASSETS.md`](docs/ASSETS.md)).

## Rodar

Requer Node 20.9+ (testado com o Node 24 do nvm).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## GitHub Pages

Cada push na `main` roda `.github/workflows/pages.yml`, que gera o site estático (`STATIC_EXPORT=true`, saída em `out/`) e publica no Pages. O subcaminho (`/ecommerce2`) e o endereço público vêm do próprio Pages. No modo estático não há otimização de imagem nem headers: as imagens já são WebP no tamanho final e passam por `src/lib/static-image-loader.ts`, que só acrescenta o subcaminho.

Para testar o build estático localmente (bash):

```bash
STATIC_EXPORT=true PAGES_BASE_PATH=/ecommerce2 npm run build
```

No Git Bash do Windows, prefixe com `MSYS_NO_PATHCONV=1`, senão `/ecommerce2` vira um caminho do Windows. O export no Windows também grava os arquivos de prefetch (`__next.*.txt`) em subpastas em vez de nomes com pontos (bug do Next com `\`), o que gera 404 de prefetch só nesse teste local; o build do Actions roda em Linux e sai certo.

## O que tem

| Rota | Conteúdo |
|---|---|
| `/` | Hero da campanha, lançamentos, vantagens, carrossel de mais vendidos, bloco escuro da campanha com letreiro e lookbook, categorias |
| `/colecao/[slug]` | `todos`, `novidades`, `mais-vendidos`, `sale` e uma por categoria; filtro por tamanho, ordenação e grade de 2 ou 4 colunas |
| `/produto/[slug]` | Galeria (grade no desktop, swipe no celular, zoom em tela cheia), tamanhos com esgotados, guia de medidas, acordeões e relacionados |
| `/lookbook` | Editorial da ABISSAL com "shop the look" |
| `/checkout` | Contato, entrega, frete, Pix (10% off) ou cartão em até 6x, cupom `MERGULHO10` |
| `/conta` | Pedidos feitos neste navegador |
| `/ajuda` | FAQ (com JSON-LD `FAQPage`) e contato |

Sacola lateral com barra de frete grátis, busca com sugestões, mega menu e menu mobile.

**Tudo é simulado:** sacola e pedidos ficam no `localStorage`; o checkout não envia nada (campos de cartão sem `name` e sem autocomplete) e a newsletter só mostra o cupom.

## Estrutura

- `src/data/catalog.ts`: os 16 produtos, categorias e coleções (preços em centavos).
- `src/data/site.ts`: textos da campanha, avisos, vantagens, lookbook, rodapé e FAQ.
- `src/components/`: cabeçalho, sacola, busca, cards, seções da home (`home/`), PDP (`pdp/`), listagem e checkout.
- `src/app/globals.css`: tokens (cinza `--mist` igual ao fundo dos packshots, azul-abismo, brilho ciano) e animações.
- `scripts/assets/fetch-image.mjs`: converte uma imagem gerada (URL ou arquivo) para WebP no tamanho final.
