import Link from "next/link";

export const metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false },
};

export default function BulunamadiSayfasi() {
  return (
    <section className="sayfa-ust">
      <div className="kap">
        <h1>Bu sayfayı bulamadık</h1>
        <p>Adres değişmiş ya da yanlış yazılmış olabilir.</p>
        <div className="dugmeler">
          <Link href="/" className="dugme">Anasayfaya dön</Link>
          <Link href="/urunler" className="dugme ikinci">Ürünlere bak</Link>
        </div>
      </div>
    </section>
  );
}
