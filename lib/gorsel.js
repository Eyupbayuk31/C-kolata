// Ürün görselinin yolu. Yönetim panelinden yüklenen görsel de bu adrese kaydedilir.
export function urunGorseli(urun) {
  return `/img/urunler/${urun.slug}.webp`;
}
