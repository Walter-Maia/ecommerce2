/** Dados institucionais da NEPZERA (marca fictícia, loja de demonstração). */

export const SITE = {
  name: "NEPZERA",
  tagline: "Vestuário de autor",
  description:
    "NEPZERA é streetwear autoral brasileiro: camisetas ilustradas, moletons pesados e peças de coleção em tiragens curtas. Coleção ABISSAL — Capítulo 03 já disponível.",
  /** Endereço público; no GitHub Pages vem do workflow (ex.: https://usuario.github.io/repo). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
} as const;

/** Desconto para pagamento no Pix (0,10 = 10%). */
export const PIX_DISCOUNT = 0.1;
export const MAX_INSTALLMENTS = 6;
/** Frete grátis a partir deste valor (centavos). */
export const FREE_SHIPPING_FROM = 34900;
export const WELCOME_COUPON = { code: "MERGULHO10", percent: 10 } as const;

export const ANNOUNCEMENTS = [
  "Parcele em até 6x sem juros",
  "MERGULHO10: 10% off na primeira compra",
  "Frete grátis acima de R$ 349",
  "ABISSAL — Capítulo 03 já disponível",
];

export const CAMPAIGN = {
  name: "ABISSAL",
  chapter: "Capítulo 03",
  status: "Já disponível",
  manifesto:
    "Onde a luz não chega, a gente desenha. Criaturas do fundo do mar, faróis em tempestade e mapas de naufrágio viram estampa em algodão pesado, em tiragem curta, feita em São Paulo.",
} as const;

export const ADVANTAGES = [
  { icon: "pix", title: "10% off no Pix", text: "Desconto aplicado na hora, em qualquer peça." },
  { icon: "truck", title: "Frete grátis", text: "Em compras acima de R$ 349 para todo o Brasil." },
  { icon: "coupon", title: "Primeiro mergulho", text: "Cupom MERGULHO10: 10% off na primeira compra." },
  { icon: "swap", title: "Troca facilitada", text: "Primeira troca grátis em até 30 dias." },
] as const;

export const LOOKBOOK = [
  {
    src: "/images/editorial/lookbook-01.webp",
    alt: "Modelo com a Anglerfish Classic Tee e jeans largo no túnel de um aquário antigo iluminado em azul",
    caption: "Túnel 03",
    products: ["anglerfish-classic-tee", "mare-baggy-jeans"],
  },
  {
    src: "/images/editorial/lookbook-02.webp",
    alt: "Modelo com a Tridente Varsity Jacket em um píer enferrujado à noite, com neblina",
    caption: "Píer, 2h14",
    products: ["tridente-varsity-jacket", "correnteza-jorts"],
  },
  {
    src: "/images/editorial/lookbook-03.webp",
    alt: "Modelo de costas mostrando a estampa de cardume do Cardume Hoodie na casa de máquinas de um navio",
    caption: "Casa de máquinas",
    products: ["cardume-hoodie"],
  },
  {
    src: "/images/editorial/lookbook-04.webp",
    alt: "Modelo sentada sobre redes de pesca com a Medusa Blue Heavy Tee e a Pescador Flannel aberta",
    caption: "Rede de arrasto",
    products: ["medusa-blue-heavy-tee", "pescador-flannel"],
  },
  {
    src: "/images/editorial/lookbook-05.webp",
    alt: "Dois modelos diante de um tanque de vidro escuro, um deles segurando um capacete de escafandro antigo",
    caption: "Escafandro",
    products: ["escafandro-long-tee", "kraken-heavy-tee"],
  },
  {
    src: "/images/editorial/lookbook-06.webp",
    alt: "Modelo com o Abissal Dad Hat e a Rede Mesh Jersey em um galpão portuário",
    caption: "Galpão 9",
    products: ["abissal-dad-hat", "rede-mesh-jersey"],
  },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Loja",
    links: [
      { label: "Novidades", href: "/colecao/novidades" },
      { label: "Camisetas", href: "/colecao/camisetas" },
      { label: "Moletons & jaquetas", href: "/colecao/moletons" },
      { label: "Sale", href: "/colecao/sale" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Trocas e devoluções", href: "/ajuda#trocas" },
      { label: "Prazos e frete", href: "/ajuda#frete" },
      { label: "Guia de tamanhos", href: "/ajuda#tamanhos" },
      { label: "Contato", href: "/ajuda#contato" },
    ],
  },
  {
    title: "Nepzera",
    links: [
      { label: "Lookbook ABISSAL", href: "/lookbook" },
      { label: "Revendedores", href: "/ajuda#revenda" },
      { label: "Políticas & termos", href: "/ajuda#politicas" },
    ],
  },
] as const;

export const FAQ = [
  {
    id: "trocas",
    q: "Como funciona a troca?",
    a: "A primeira troca é grátis em até 30 dias após o recebimento. A peça precisa estar sem uso, com etiqueta. Solicite pelo e-mail de contato com o número do pedido e enviamos o código de postagem.",
  },
  {
    id: "frete",
    q: "Qual é o prazo de entrega?",
    a: "Postamos em até 2 dias úteis. Capitais do Sudeste recebem em 2 a 5 dias úteis; demais regiões, em 4 a 10 dias úteis. Compras acima de R$ 349 têm frete grátis.",
  },
  {
    id: "tamanhos",
    q: "Como escolher o tamanho?",
    a: "As camisetas Heavy têm modelagem boxy: ombro caído e corpo largo. Se você prefere caimento mais justo, peça um número abaixo. Cada produto mostra a altura e o tamanho que o modelo veste.",
  },
  {
    id: "pagamento",
    q: "Quais são as formas de pagamento?",
    a: "Pix com 10% de desconto ou cartão de crédito em até 6x sem juros. Nesta loja de demonstração o pagamento é simulado: nenhum dado é enviado.",
  },
  {
    id: "revenda",
    q: "Vocês trabalham com revenda?",
    a: "Sim, para lojas multimarca selecionadas. Envie o portfólio da sua loja para o e-mail de contato.",
  },
  {
    id: "politicas",
    q: "Políticas e termos",
    a: "NEPZERA é uma marca fictícia criada para esta demonstração de e-commerce. Produtos, pessoas e pedidos são simulados e nenhuma compra real é processada.",
  },
] as const;
