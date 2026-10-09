// Ürünler. Fiyat bilerek yok: eski sitedeki fiyatlar güncel değildi,
// toptan fiyat zaten teklifle konuşuluyor.

const drajeOrtak =
  "Helal sertifikalıdır, içeriğinde ilave glikoz şurubu bulunmaz. 80 gr zip-lock ambalajda, toptan satışa uygun şekilde sunulur.";

export const kategoriler = ["Draje", "Krema ve Çikolata"];

export const urunler = [
  {
    slug: "mr-resbaa-findikli-draje-80gr",
    ad: "Fındıklı Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Birinci kalite fındık, sütlü çikolata kaplama.",
    aciklama: `Birinci kalite fındığın sütlü çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-antep-fistikli-draje-80gr",
    ad: "Antep Fıstıklı Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Birinci kalite Antep fıstığı, sütlü çikolata kaplama.",
    aciklama: `Birinci kalite Antep fıstığının sütlü çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-bademli-draje-80gr",
    ad: "Bademli Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Birinci kalite badem, sütlü çikolata kaplama.",
    aciklama: `Birinci kalite bademin sütlü çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-kahve-cekirdekli-draje-80gr",
    ad: "Kahve Çekirdekli Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Gerçek kahve çekirdeği, yoğun aromalı.",
    aciklama: `Gerçek kahve çekirdeğinin sütlü çikolatayla kaplanmasıyla üretilir. Kahve sevenlere yoğun aromalı bir draje sunar. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-cilekli-draje-sutlu-cikolata-80gr",
    ad: "Çilekli Draje (Sütlü Çikolata)",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Dondurularak kurutulmuş çilek, sütlü çikolata.",
    aciklama: `Doğal dondurularak kurutma yöntemiyle işlenmiş gerçek çileğin sütlü çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-cilekli-draje-beyaz-cikolata-80gr",
    ad: "Çilekli Draje (Beyaz Çikolata)",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Dondurularak kurutulmuş çilek, beyaz çikolata.",
    aciklama: `Doğal dondurularak kurutma yöntemiyle işlenmiş gerçek çileğin beyaz çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-kirazli-draje-80gr",
    ad: "Vişneli Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Dondurularak kurutulmuş vişne, sütlü çikolata.",
    aciklama: `Doğal dondurularak kurutma yöntemiyle işlenmiş gerçek vişnenin sütlü çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-mangolu-draje-80gr",
    ad: "Mangolu Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Dondurularak kurutulmuş mango, sütlü çikolata.",
    aciklama: `Doğal dondurularak kurutma yöntemiyle işlenmiş gerçek mangonun sütlü çikolatayla kaplanmasıyla üretilir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-bogurtlen-draje-80gr",
    ad: "Böğürtlenli Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Böğürtlen ve sütlü çikolata.",
    aciklama: `Böğürtlenin sütlü çikolatayla buluştuğu meyveli draje. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-biskuvili-draje-80gr",
    ad: "Bisküvili Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Bütün bisküvi, sütlü çikolata.",
    aciklama: `Bütün bisküvilerin sütlü çikolatayla kaplanmasıyla hazırlanır. Her ısırıkta çıtır bisküviyle yumuşak çikolata bir arada gelir. ${drajeOrtak}`,
  },
  {
    slug: "mr-resbaa-binbonbon-draje-80gr",
    ad: "BinBonBon Karışık Draje",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Rengârenk şeker kaplamalı sütlü çikolata.",
    aciklama: `Canlı renkli şeker kaplamalı sütlü çikolata drajelerinden oluşan karışım. Çocuklar da yetişkinler de sever. ${drajeOrtak.replace("zip-lock ambalajda", "zip-lock (tekrar kapanabilir) ambalajda")}`,
  },
  {
    slug: "mr-resbaa-cikolata-taslari-draje-80gr",
    ad: "Çikolata Taşları",
    kategori: "Draje",
    gramaj: "80 gr",
    ozet: "Doğal taş görünümlü karışık draje.",
    aciklama: `Sütlü çikolata kaplamayla elde edilen, doğal taş görünümlü özgün bir draje karışımı. ${drajeOrtak}`,
  },
  {
    slug: "320-gr-kakaolu-findik-kremasi",
    ad: "Kakaolu Fındık Kreması",
    kategori: "Krema ve Çikolata",
    gramaj: "320 gr",
    ozet: "%35 fındık oranlı, kavanozda.",
    aciklama: "%35 yüksek fındık oranıyla hazırlanan kakaolu fındık kreması. 320 gr cam kavanozda sunulur.",
  },
  {
    slug: "cipsli-cikolata-70gr",
    ad: "Çıtır Patatesli Çikolata",
    kategori: "Krema ve Çikolata",
    gramaj: "70 gr",
    ozet: "Patates cipsi ve fındık kreması dolgulu.",
    aciklama: "Çıtır patates cipsiyle fındık kremasının birleştiği çikolata. Tuzlu ile tatlıyı bir arada sevenlere.",
  },
];

export function urunBul(slug) {
  return urunler.find((u) => u.slug === slug);
}

export function urunGorseli(u) {
  return `/img/urunler/${u.slug}.webp`;
}
