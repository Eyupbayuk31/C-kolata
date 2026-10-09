import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButonu from "@/components/WhatsAppButonu";
import { firma, siteUrl } from "@/data/firma";
import { yol } from "@/lib/yol";

const baslikFont = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-baslik",
  display: "swap",
});

const metinFont = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-metin",
  display: "swap",
});

// kurucunun imzası için el yazısı
const imzaFont = Pinyon_Script({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-imza",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MB Çikolata | Toptan Draje, Çikolata ve Şekerleme – Afyonkarahisar",
    template: "%s | MB Çikolata",
  },
  description:
    "Afyonkarahisar'da üretim yapan MB Çikolata, Mr ResBaa markalı 12 çeşit helal sertifikalı draje ve çikolata ürünlerini toptan satıyor. 11 ülkeye ihracat. Teklif için bize yazın.",
  // Paylaşım görselini dosya olarak değil adresle veriyoruz; alt yol (GitHub Pages)
  // metadataBase üzerinden bir kez eklenmiş oluyor.
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "MB Çikolata",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: yol("/icon-192.png"),
    apple: yol("/icon-192.png"),
  },
};

export const viewport = {
  themeColor: "#14100d",
};

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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [firma.facebook, firma.instagram],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${baslikFont.variable} ${metinFont.variable} ${imzaFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(firmaVerisi) }}
        />
        <noscript>
          <style>{`[data-belir]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#icerik" className="atla">
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <WhatsAppButonu />
      </body>
    </html>
  );
}
