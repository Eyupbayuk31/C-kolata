import "@/app/globals.css";
import Etkilesim from "@/components/Etkilesim";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButonu from "@/components/WhatsAppButonu";
import { firma, siteUrl } from "@/data/firma";
import { dilBilgi, yerel } from "@/lib/dil";
import { fontSiniflari } from "@/lib/fontlar";
import { ui } from "@/lib/ui";

// Google'a firmayı tanıtan yapılandırılmış veri
const firmaVerisi = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: firma.ad,
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  image: `${siteUrl}/opengraph-image.png`,
  telephone: firma.telefon,
  email: firma.eposta,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Şuhut OSB Mevkii 1. Cadde 5. Sokak No:4 İç Kapı No:2, Belkaracaören Köyü",
    addressLocality: "Merkez",
    addressRegion: "Afyonkarahisar",
    addressCountry: "TR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
  ],
  knowsLanguage: ["tr", "en", "ar"],
  sameAs: [firma.facebook, firma.instagram],
};

// Her dil için ayrı <html lang dir> gerektiği için iki kök layout bunu kullanıyor
export default function Kabuk({ lang, children }) {
  const t = ui(lang);
  const duyuruMetni = firma.duyuru.aktif ? yerel(firma.duyuru.metin, lang) : "";

  return (
    <html
      lang={lang}
      dir={dilBilgi[lang].yon}
      className={fontSiniflari}
      style={duyuruMetni ? { "--duyuru-y": "40px" } : undefined}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firmaVerisi) }} />
        <noscript>
          <style>{`[data-belir]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#icerik" className="atla">
          {t.nav.atla}
        </a>
        <Etkilesim />
        <Header lang={lang} nav={t.nav} duyuru={duyuruMetni} duyuruLink={firma.duyuru.link} />
        <main id="icerik">{children}</main>
        <Footer lang={lang} />
        <WhatsAppButonu lang={lang} />
      </body>
    </html>
  );
}
