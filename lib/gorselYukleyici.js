// GitHub Pages'te site /repo-adi/ altında açılıyor, Next'in görsel optimizasyonu da
// olmadığı için görsel adreslerine alt yolu biz ekliyoruz.
export default function gorselYukleyici({ src }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}`;
}
