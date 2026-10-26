import type { NextConfig } from "next";

const base: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

/** Servidor Node (`next dev` / `next start`): otimização de imagens e headers de segurança. */
const server: NextConfig = {
  ...base,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

/**
 * Site estático para o GitHub Pages (`STATIC_EXPORT=true`), gerado em `out/`.
 * Sem servidor não há otimização de imagem nem headers; `PAGES_BASE_PATH` é o
 * subcaminho do repositório (ex.: `/ecommerce2`).
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";
const pages: NextConfig = {
  ...base,
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { loader: "custom", loaderFile: "./src/lib/static-image-loader.ts" },
};

export default process.env.STATIC_EXPORT === "true" ? pages : server;
