const harita = { ç: "c", ğ: "g", ı: "i", i: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

// "Şuhut'ta Yeni Tesis" -> "suhutta-yeni-tesis"
export function slugYap(metin) {
  return String(metin)
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (h) => harita[h] || h)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
