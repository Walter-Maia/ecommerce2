/**
 * Catálogo da NEPZERA — coleção ABISSAL, Capítulo 03.
 * Preços em centavos. Imagens geradas no Higgsfield (ver docs/ASSETS.md).
 */

export type CategorySlug = "camisetas" | "moletons" | "jaquetas" | "calcas" | "bermudas" | "acessorios";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  color: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  soldOut?: string[];
  isNew?: boolean;
  bestSeller?: boolean;
  description: string;
  composition: string[];
  model: string;
}

export const CATEGORIES: Category[] = [
  { slug: "camisetas", name: "Camisetas", description: "Classic e Heavy Tees ilustradas, mangas longas e jerseys." },
  { slug: "moletons", name: "Moletons", description: "Moletons pesados com estampas nas costas." },
  { slug: "jaquetas", name: "Jaquetas & camisas", description: "Varsity, overshirts e camadas para a noite." },
  { slug: "calcas", name: "Calças", description: "Jeans largos e lavagens vintage." },
  { slug: "bermudas", name: "Bermudas", description: "Jorts e bermudas de corte reto." },
  { slug: "acessorios", name: "Acessórios", description: "Bonés e gorros bordados." },
];

const TEE = ["P", "M", "G", "GG", "XGG"];
const DENIM = ["38", "40", "42", "44", "46"];
const UNICO = ["Único"];

const CLASSIC = ["100% algodão penteado, malha 30.1", "Gramatura 200 g/m²", "Modelagem regular", "Estampa em silk-screen à base d'água"];
const HEAVY = ["100% algodão, malha encorpada", "Gramatura 260 g/m²", "Modelagem boxy, ombro caído", "Gola canelada de 3 cm", "Lavagem enzimática pós-tingimento"];

export const PRODUCTS: Product[] = [
  {
    slug: "anglerfish-classic-tee",
    name: "Anglerfish Classic Tee",
    category: "camisetas",
    color: "Preto",
    price: 17990,
    sizes: TEE,
    soldOut: ["XGG"],
    isNew: true,
    bestSeller: true,
    description:
      "O peixe-diabo-negro em gravura osso, com a isca acesa em ciano. A estampa que abre o Capítulo 03 da ABISSAL, em malha preta estonada.",
    composition: CLASSIC,
    model: "O modelo tem 1,80 m, pesa 70 kg e veste M.",
  },
  {
    slug: "kraken-heavy-tee",
    name: "Kraken Heavy Tee",
    category: "camisetas",
    color: "Off-white",
    price: 22990,
    sizes: TEE,
    isNew: true,
    bestSeller: true,
    description:
      "Gravura do século XIX em azul cobalto: o kraken abraça um veleiro no meio da tempestade. Malha pesada cor cru, caimento boxy.",
    composition: HEAVY,
    model: "A modelo tem 1,70 m, pesa 58 kg e veste P.",
  },
  {
    slug: "medusa-blue-heavy-tee",
    name: "Medusa Blue Heavy Tee",
    category: "camisetas",
    color: "Azul-marinho",
    price: 22990,
    sizes: TEE,
    isNew: true,
    bestSeller: true,
    description:
      "Três águas-vivas em traço fino branco atravessam o peito na diagonal. Composição assimétrica que continua nas costas, na barra.",
    composition: HEAVY,
    model: "O modelo tem 1,88 m, pesa 78 kg e veste G.",
  },
  {
    slug: "medusa-black-heavy-tee",
    name: "Medusa Black Heavy Tee",
    category: "camisetas",
    color: "Preto",
    price: 22990,
    sizes: TEE,
    soldOut: ["P"],
    isNew: true,
    description:
      "A Medusa em versão noturna: traço cinza-prata sobre malha preta pesada. Mesma composição assimétrica da Medusa Blue.",
    composition: HEAVY,
    model: "O modelo tem 1,80 m, pesa 70 kg e veste M.",
  },
  {
    slug: "farol-classic-tee",
    name: "Farol Classic Tee",
    category: "camisetas",
    color: "Branco",
    price: 17990,
    sizes: TEE,
    isNew: true,
    description:
      "Um farol sozinho nas pedras, em hachura de nanquim. Embaixo, a assinatura Nepzera em pincel. Para quem guarda luz no fundo.",
    composition: CLASSIC,
    model: "A modelo tem 1,74 m, pesa 62 kg e veste M.",
  },
  {
    slug: "escafandro-long-tee",
    name: "Escafandro Long Tee",
    category: "camisetas",
    color: "Preto",
    price: 24990,
    sizes: TEE,
    isNew: true,
    bestSeller: true,
    description:
      "Capacete de escafandro em tons sépia e ferrugem, com textura de serigrafia. ABISSAL corre pela manga esquerda.",
    composition: ["100% algodão, malha encorpada", "Gramatura 240 g/m²", "Punhos canelados", "Estampa frontal e na manga"],
    model: "O modelo tem 1,88 m, pesa 78 kg e veste G.",
  },
  {
    slug: "abissal-dad-hat",
    name: "Abissal Dad Hat",
    category: "acessorios",
    color: "Preto estonado",
    price: 18990,
    sizes: UNICO,
    isNew: true,
    bestSeller: true,
    description:
      "Boné de seis gomos em sarja lavada, sem estrutura, com ABISSAL bordado à mão em off-white e uma onda logo abaixo.",
    composition: ["100% algodão, sarja lavada", "Aba curva pré-moldada", "Regulagem traseira", "Bordado frontal"],
    model: "Tamanho único, regulável (54–60 cm).",
  },
  {
    slug: "nautilus-heavy-tee",
    name: "Nautilus Heavy Tee",
    category: "camisetas",
    color: "Grafite estonado",
    price: 17990,
    compareAt: 22990,
    sizes: TEE,
    soldOut: ["GG"],
    description:
      "Corte transversal de um náutilo, com as câmaras em espiral dourada. Ilustração científica sobre malha grafite com lavagem ácida.",
    composition: HEAVY,
    model: "A modelo tem 1,74 m, pesa 62 kg e veste M.",
  },
  {
    slug: "cardume-hoodie",
    name: "Cardume Hoodie",
    category: "moletons",
    color: "Preto",
    price: 44990,
    sizes: TEE,
    isNew: true,
    bestSeller: true,
    description:
      "Frente limpa, só a assinatura bordada. Nas costas, centenas de peixes prateados formam um redemoinho. Moletom felpado pesado, capuz duplo.",
    composition: ["80% algodão, 20% poliéster", "Moletom felpado 420 g/m²", "Capuz forrado duplo", "Bolso canguru", "Estampa grande nas costas"],
    model: "O modelo tem 1,80 m, pesa 70 kg e veste G.",
  },
  {
    slug: "tridente-varsity-jacket",
    name: "Tridente Varsity Jacket",
    category: "jaquetas",
    color: "Marinho e creme",
    price: 64990,
    sizes: TEE,
    soldOut: ["XGG"],
    isNew: true,
    description:
      "Corpo em lã marinho, mangas em couro creme e ribanas listradas. Tridente em chenille no peito e NEPZERA em arco nas costas.",
    composition: ["Corpo: 70% lã, 30% poliéster", "Mangas: couro sintético", "Forro acolchoado", "Botões de pressão", "Patches em chenille bordados"],
    model: "A modelo tem 1,70 m, pesa 58 kg e veste M.",
  },
  {
    slug: "correnteza-jorts",
    name: "Correnteza Jorts",
    category: "bermudas",
    color: "Preto lavado",
    price: 29990,
    sizes: DENIM,
    description:
      "Bermuda jeans larga abaixo do joelho, lavagem preta desbotada e barra a fio. Uma onda bordada no bolso traseiro.",
    composition: ["100% algodão, denim 12 oz", "Cinco bolsos", "Rebites metálicos", "Barra desfiada"],
    model: "O modelo tem 1,88 m, pesa 78 kg e veste 42.",
  },
  {
    slug: "mare-baggy-jeans",
    name: "Maré Baggy Jeans",
    category: "calcas",
    color: "Azul vintage",
    price: 39990,
    sizes: DENIM,
    soldOut: ["38"],
    bestSeller: true,
    description:
      "Jeans de perna muito larga, cintura alta e lavagem stone vintage. Ondas pespontadas em branco nos bolsos traseiros.",
    composition: ["100% algodão, denim 13 oz", "Cintura alta", "Perna wide", "Pesponto contrastante nos bolsos"],
    model: "A modelo tem 1,74 m, pesa 62 kg e veste 40.",
  },
  {
    slug: "rede-mesh-jersey",
    name: "Rede Mesh Jersey",
    category: "camisetas",
    color: "Preto",
    price: 25990,
    sizes: TEE,
    isNew: true,
    description:
      "Jersey de futebol em mesh perfurado, gola V e número 03 em creme. Leve, para usar sobre manga longa ou sozinha.",
    composition: ["100% poliéster, mesh respirável", "Gola V", "Número e assinatura em transfer", "Vivo nas mangas"],
    model: "O modelo tem 1,80 m, pesa 70 kg e veste G.",
  },
  {
    slug: "ancora-beanie",
    name: "Âncora Beanie",
    category: "acessorios",
    color: "Azul-marinho",
    price: 9990,
    compareAt: 13990,
    sizes: UNICO,
    description: "Gorro canelado grosso com barra dobrada e etiqueta tecida com uma âncora. O par certo para o píer às 2h da manhã.",
    composition: ["100% acrílico", "Tricô canelado 2x2", "Etiqueta tecida", "Tamanho único"],
    model: "Tamanho único, malha com elasticidade.",
  },
  {
    slug: "pescador-flannel",
    name: "Pescador Flannel",
    category: "jaquetas",
    color: "Xadrez marinho",
    price: 27990,
    compareAt: 34990,
    sizes: TEE,
    description: "Overshirt de flanela escovada em xadrez marinho, petróleo e preto. Dois bolsos com lapela e botões de madrepérola.",
    composition: ["100% algodão, flanela escovada", "Gramatura 280 g/m²", "Botões de madrepérola", "Dois bolsos com lapela"],
    model: "A modelo tem 1,74 m, pesa 62 kg e veste G.",
  },
  {
    slug: "baleia-classic-tee",
    name: "Baleia Classic Tee",
    category: "camisetas",
    color: "Branco",
    price: 17990,
    sizes: TEE,
    bestSeller: true,
    description:
      "Esqueleto de baleia em prancha científica, com legendas numeradas em azul-marinho. Atravessa o peito de ombro a ombro.",
    composition: CLASSIC,
    model: "A modelo tem 1,70 m, pesa 58 kg e veste M.",
  },
];

export interface Collection {
  slug: string;
  name: string;
  description: string;
  filter: (p: Product) => boolean;
}

export const COLLECTIONS: Collection[] = [
  { slug: "todos", name: "Shop all", description: "Todas as peças da NEPZERA.", filter: () => true },
  { slug: "novidades", name: "New", description: "Lançamentos da ABISSAL — Capítulo 03.", filter: (p) => !!p.isNew },
  { slug: "mais-vendidos", name: "Mais vendidos", description: "As peças que mais saem da loja.", filter: (p) => !!p.bestSeller },
  { slug: "sale", name: "Sale", description: "Peças com preço reduzido, enquanto durar o estoque.", filter: (p) => !!p.compareAt },
  ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, description: c.description, filter: (p: Product) => p.category === c.slug })),
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function productImages(p: Pick<Product, "slug" | "name">) {
  const base = `/images/produtos/${p.slug}`;
  return {
    front: { src: `${base}/frente.webp`, alt: `${p.name} — frente` },
    back: { src: `${base}/costas.webp`, alt: `${p.name} — costas` },
    model: { src: `${base}/modelo.webp`, alt: `Modelo vestindo ${p.name}` },
  };
}

export function related(p: Product, n = 4) {
  const same = PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category);
  const rest = PRODUCTS.filter((x) => x.slug !== p.slug && x.category !== p.category);
  return [...same, ...rest].slice(0, n);
}
