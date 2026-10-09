// GITHUB_PAGES=true ile build alınca site statik dosyalara dönüşür (out/ klasörü).
// Vercel'de bu değişken yok, normal Next.js gibi çalışır.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// WordPress'teki eski adresler Google'da kayıtlı, bozulmasın diye yönlendiriyoruz.
// (GitHub Pages sunucu tarafı yönlendirme yapamadığı için sadece Vercel'de çalışır.)
const yonlendirmeler = [
  // adı ile görseli karışık olan iki ürünün eski adresleri
  {
    source: "/product/mr-resbaa-binbonbon-karisik-draje-80gr",
    destination: "/urun/mr-resbaa-bogurtlen-draje-80gr",
    permanent: true,
  },
  {
    source: "/product/mr-resbaa-bonibon-draje-80gr",
    destination: "/urun/mr-resbaa-binbonbon-draje-80gr",
    permanent: true,
  },
  { source: "/product/:slug", destination: "/urun/:slug", permanent: true },
  { source: "/product-category/:path*", destination: "/urunler", permanent: true },
  { source: "/shop", destination: "/urunler", permanent: true },
  { source: "/gallery/urunler", destination: "/urunler", permanent: true },
  { source: "/privacy", destination: "/gizlilik-politikasi", permanent: true },
  { source: "/bayi-girisi", destination: "/bayilik", permanent: true },
  { source: "/cart", destination: "/urunler", permanent: true },
  { source: "/checkout", destination: "/urunler", permanent: true },
];

/** @type {import('next').NextConfig} */
const nextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: { loader: "custom", loaderFile: "./lib/gorselYukleyici.js" },
      env: { NEXT_PUBLIC_SLASH: "1" },
      experimental: { globalNotFound: true },
    }
  : {
      images: { formats: ["image/avif", "image/webp"] },
      experimental: { globalNotFound: true },
      async redirects() {
        return yonlendirmeler;
      },
    };

export default nextConfig;
