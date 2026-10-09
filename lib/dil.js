// Dil ayarları. Yeni dil eklemek için: buraya yaz, lib/ui/ altına sözlük ekle,
// app/[lang]/ zaten tüm diller için çalışıyor.
export const diller = ["tr", "en", "ar"];
export const varsayilanDil = "tr";

export const dilBilgi = {
  tr: { ad: "Türkçe", kisa: "TR", yon: "ltr", og: "tr_TR", tarih: "tr-TR" },
  en: { ad: "English", kisa: "EN", yon: "ltr", og: "en_GB", tarih: "en-GB" },
  ar: { ad: "العربية", kisa: "AR", yon: "rtl", og: "ar_AR", tarih: "ar-u-nu-latn" },
};

// Türkçe kök adreste (eski WordPress adresleri bozulmasın), diğerleri /en, /ar altında.
export function dilYol(dil, yol = "/") {
  const temiz = yol.startsWith("/") ? yol : `/${yol}`;
  if (dil === varsayilanDil) return temiz;
  return temiz === "/" ? `/${dil}` : `/${dil}${temiz}`;
}

// "/en/urunler/" -> { dil: "en", yol: "/urunler/" }
export function yoldanDil(yol) {
  for (const d of diller) {
    if (d === varsayilanDil) continue;
    if (yol === `/${d}` || yol === `/${d}/`) return { dil: d, yol: "/" };
    if (yol.startsWith(`/${d}/`)) return { dil: d, yol: yol.slice(d.length + 1) };
  }
  return { dil: varsayilanDil, yol };
}

// {tr, en, ar} biçimli alandan dile uygun metni al, çeviri boşsa Türkçeye düş
export function yerel(alan, dil) {
  if (alan == null) return "";
  if (typeof alan === "string") return alan;
  return (alan[dil] && String(alan[dil]).trim()) || alan[varsayilanDil] || "";
}

export function tarihYaz(iso, dil) {
  return new Date(iso).toLocaleDateString(dilBilgi[dil].tarih, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
