// Haberler data/haberler.json içinde, yönetim panelinden düzenlenebilir.
import liste from "./haberler.json";

// en yeni üstte
export const haberler = [...liste].sort((a, b) => b.tarih.localeCompare(a.tarih));

export function haberBul(slug) {
  return haberler.find((h) => h.slug === slug);
}

// Haber gövdesi düz metin: boş satırla paragraf ayrılır, "## " ile başlayan satır ara başlık,
// "- " ile başlayan satırlar madde işareti olur.
export function govdeBloklari(metin) {
  const bloklar = [];
  for (const parca of String(metin || "").split(/\n\s*\n/)) {
    const satirlar = parca.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!satirlar.length) continue;
    if (satirlar.every((s) => s.startsWith("- "))) {
      bloklar.push({ tur: "liste", maddeler: satirlar.map((s) => s.slice(2)) });
      continue;
    }
    if (satirlar[0].startsWith("## ")) {
      bloklar.push({ tur: "baslik", metin: satirlar[0].slice(3) });
      satirlar.shift();
      if (!satirlar.length) continue;
    }
    bloklar.push({ tur: "p", metin: satirlar.join(" ") });
  }
  return bloklar;
}
