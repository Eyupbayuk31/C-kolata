// Ürünler data/urunler.json içinde, yönetim panelinden düzenlenebilir.
// Fiyat bilerek yok: eski sitedeki fiyatlar güncel değildi, toptan fiyat teklifle konuşuluyor.
import liste from "./urunler.json";

export const kategoriler = ["draje", "krema"];
export const urunler = liste;

export function urunBul(slug) {
  return urunler.find((u) => u.slug === slug);
}

export { urunGorseli } from "@/lib/gorsel";
