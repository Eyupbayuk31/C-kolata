/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // WordPress'teki eski adresler Google'da kayıtlı, bozulmasın diye yönlendiriyoruz.
  async redirects() {
    return [
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
  },
};

export default nextConfig;
