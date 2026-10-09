import Link from "next/link";
import "./globals.css";
import { fontSiniflari } from "@/lib/fontlar";

export const metadata = {
  title: "404 | MB Çikolata",
  robots: { index: false },
};

// Hangi dilde olduğunu bilemediğimiz için üç dilli
export default function GlobalNotFound() {
  return (
    <html lang="tr" className={fontSiniflari}>
      <body>
        <section className="sayfa-ust bulunamadi">
          <div className="kap">
            <p className="ust-baslik">404</p>
            <h1>Bu sayfayı bulamadık</h1>
            <p>Adres değişmiş ya da yanlış yazılmış olabilir.</p>
            <p lang="en">We couldn&apos;t find this page.</p>
            <p lang="ar" dir="rtl">لم نعثر على هذه الصفحة.</p>
            <div className="dugmeler">
              <Link href="/" className="dugme">Anasayfa</Link>
              <Link href="/en" className="dugme ikinci">English</Link>
              <Link href="/ar" className="dugme ikinci">العربية</Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
