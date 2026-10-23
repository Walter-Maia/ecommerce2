# Imagens da NEPZERA (geradas no Higgsfield em 23/10/2026)

Marca, peças e pessoas são **fictícias**. Os prompts proíbem logos de terceiros; os únicos textos nas peças são NEPZERA, ABISSAL, CARDUME, 03 e as legendas das ilustrações.

## Receita

Mesma receita do projeto KIM & KRIS, com `gpt_image_2_5`, `quality: high` e `resolution: 2k`.

- **Packshot frente** (4:5): peça em manequim invisível, fundo cinza liso `#EDEDED` (sai `#EBEBEB`, que é o `--mist` do CSS), luz difusa, 80 mm f/8.
- **Costas / vista alternativa** (4:5): o packshot da frente como `image_references`, com o prompt pedindo só a mudança da estampa. A Medusa Black é a Medusa Blue recolorida pelo mesmo método.
- **Foto vestida** (4:5): o packshot como referência, estúdio cinza claro e corpo inteiro. Boné e gorro em retrato.
- **Campanha** (hero 16:9 + 9:16 e 6 fotos de lookbook em 4:5): os packshots como referência para as roupas baterem com o catálogo. Cenários: aquário abandonado, túnel de aquário, píer à noite, casa de máquinas de navio e galpão portuário. Filme 35 mm com grão.
- **Título "ABISSAL"**: letreiro feito à mão com `background: transparent` (WebP com alfa, recortado).

## Elenco fixo

Mesma descrição em todos os prompts, para manter os rostos.

| Nome | Descrição | Aparece em |
|---|---|---|
| RAÍ | homem brasileiro, ~24, pele morena média, cachos curtos com pontas descoloridas, bigode fino, argola prata | Anglerfish, Medusa Black, Cardume, Rede Mesh, hero, lookbook 01 e 05 |
| NINA | mulher brasileira, ~23, pele oliva clara, wolf cut preto com franja, piercing no septo | Kraken, Dad Hat, Varsity, Baleia, hero, lookbook 02 e 05 |
| JOÃO | homem afro-brasileiro, ~27, pele retinta, twists curtos, barba rala | Medusa Blue, Escafandro, Jorts, Beanie, hero, lookbook 03 e 06 |
| LIA | mulher brasileira, ~26, pele retinta, buzz cut platinado, brincos dourados | Farol, Nautilus, Jeans, Flannel, hero, lookbook 04 |

## Arquivos

| Pasta | Conteúdo | Tamanho |
|---|---|---|
| `public/images/produtos/<slug>/frente.webp` | 16 packshots | 1200×1500 |
| `public/images/produtos/<slug>/costas.webp` | 16 costas / vistas alternativas | 1200×1500 |
| `public/images/produtos/<slug>/modelo.webp` | 16 fotos vestidas | 1200×1500 |
| `public/images/editorial/hero.webp`, `hero-mobile.webp` | hero da campanha | 2560×1440 / 1080×1920 |
| `public/images/editorial/lookbook-0[1-6].webp` | lookbook | 1200×1500 |
| `public/images/editorial/abissal-title.webp` | título com transparência | 1400×683 |

Conversão: `node scripts/assets/fetch-image.mjs <url|arquivo> <saida.webp> <w> <h|auto> [qualidade] [--trim]`.

Custo total: **≈ 157 créditos** (57 imagens a 2,75 cada, sem refações).
