/**
 * Loader do build estático (GitHub Pages). Sem servidor para redimensionar,
 * serve o próprio WebP, que já sai do script de assets no tamanho final, com o
 * `basePath` na frente: o `next/image` não o acrescenta sozinho ao `src`.
 * Sem "use client": o `getImageProps` do Hero o chama no servidor.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function staticImageLoader({ src }: { src: string; width: number; quality?: number }) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
