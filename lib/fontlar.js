import { Amiri, Bodoni_Moda, Jost, Pinyon_Script, Tajawal } from "next/font/google";

const baslik = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-baslik",
  display: "swap",
});

const metin = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-metin",
  display: "swap",
});

// kurucunun imzası için el yazısı
const imza = Pinyon_Script({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-imza",
  display: "swap",
});

// Arapça için: başlıkta klasik Amiri, metinde Tajawal.
// preload kapalı, tarayıcı yalnızca Arapça sayfada indiriyor.
const arBaslik = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-ar-baslik",
  display: "swap",
  preload: false,
});

const arMetin = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ar-metin",
  display: "swap",
  preload: false,
});

export const fontSiniflari = [baslik, metin, imza, arBaslik, arMetin].map((f) => f.variable).join(" ");
