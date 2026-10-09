// Firma bilgileri data/ayarlar.json içinde, yönetim panelinden de değiştirilebilir.
import ayarlar from "./ayarlar.json";

// "+90 555 028 99 52" -> "905550289952"
function telefonRakam(tel) {
  let rakam = String(tel || "").replace(/\D/g, "");
  if (rakam.startsWith("0")) rakam = `90${rakam.slice(1)}`;
  else if (rakam.length === 10) rakam = `90${rakam}`;
  return rakam;
}

export const firma = {
  ad: "MB Çikolata",
  marka: "Mr ResBaa",
  site: "https://mbcikolata.com",
  slogan: "Toptan draje, çikolata ve şekerleme",

  telefon: ayarlar.iletisim.telefon,
  telefonRaw: telefonRakam(ayarlar.iletisim.telefon),
  telefon2: ayarlar.iletisim.telefon2,
  telefon2Raw: telefonRakam(ayarlar.iletisim.telefon2),
  eposta: ayarlar.iletisim.eposta,
  adres: ayarlar.iletisim.adres, // {tr, en, ar}
  saatler: ayarlar.saatler,

  facebook: ayarlar.sosyal.facebook,
  instagram: ayarlar.sosyal.instagram,

  rakamlar: ayarlar.rakamlar,
  duyuru: ayarlar.duyuru,

  // Resmi bilgiler: dolduruldukça footer'da ve KVKK sayfasında görünür
  ticariUnvan: ayarlar.resmi.ticariUnvan,
  vergiDairesi: ayarlar.resmi.vergiDairesi,
  vergiNo: ayarlar.resmi.vergiNo,
  mersisNo: ayarlar.resmi.mersisNo,
};

// Yayın adresi. GitHub Pages'te workflow bunu github.io adresine çeker,
// kendi alan adına geçince varsayılan (firma.site) kullanılır.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || firma.site;

export function sayi(id) {
  return firma.rakamlar.find((r) => r.id === id)?.sayi ?? "";
}

export function whatsappLink(mesaj) {
  const metin = mesaj ? `?text=${encodeURIComponent(mesaj)}` : "";
  return `https://wa.me/${firma.telefonRaw}${metin}`;
}
