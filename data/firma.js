// Firma bilgileri tek yerde dursun, değişince sadece burayı düzeltmek yeter.
export const firma = {
  ad: "MB Çikolata",
  marka: "Mr ResBaa",
  site: "https://mbcikolata.com",
  slogan: "Toptan draje, çikolata ve şekerleme",

  telefon: "+90 555 028 99 52",
  telefonRaw: "905550289952",
  telefon2: "+90 532 677 46 69",
  telefon2Raw: "905326774669",
  eposta: "satis@mbcikolata.com",

  adres: "Şuhut OSB Mevkii 1. Cadde 5. Sokak No:4 İç Kapı No:2, Belkaracaören Köyü, Merkez / Afyonkarahisar",
  saatler: [
    ["Hafta içi", "08:00 – 18:00"],
    ["Cumartesi", "09:00 – 18:00"],
    ["Pazar", "Kapalı"],
  ],

  facebook: "https://www.facebook.com/share/n4wLW8wKfsDomztb/",
  // Instagram kullanıcı adını Google sonucundan aldım, yayına çıkmadan bir kontrol et
  instagram: "https://www.instagram.com/mbchocolate.tr/",

  // Resmi bilgiler: dolduruldukça KVKK / gizlilik sayfalarında ve footer'da görünür
  ticariUnvan: "",
  vergiDairesi: "",
  vergiNo: "",
  mersisNo: "",
};

// Yayın adresi. GitHub Pages'te workflow bunu github.io adresine çeker,
// kendi alan adına geçince varsayılan (firma.site) kullanılır.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || firma.site;

export function whatsappLink(mesaj) {
  const metin = mesaj ? `?text=${encodeURIComponent(mesaj)}` : "";
  return `https://wa.me/${firma.telefonRaw}${metin}`;
}
