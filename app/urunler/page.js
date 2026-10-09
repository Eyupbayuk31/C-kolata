import Link from "next/link";
import UrunKarti from "@/components/UrunKarti";
import { urunler, kategoriler } from "@/data/urunler";
import { whatsappLink } from "@/data/firma";

export const metadata = {
  title: "Ürünler – Toptan Draje ve Çikolata",
  description:
    "Mr ResBaa markalı 12 çeşit çikolata kaplamalı draje, kakaolu fındık kreması ve çıtır patatesli çikolata. Helal sertifikalı, toptan satış.",
  alternates: { canonical: "/urunler" },
};

export default function Urunler() {
  return (
    <>
      <section className="sayfa-ust">
        <div className="kap">
          <h1>Ürünlerimiz</h1>
          <p>
            Hepsi Afyonkarahisar'daki tesisimizde üretiliyor. Toptan fiyat ve minimum sipariş için
            bize yazmanız yeterli.
          </p>
        </div>
      </section>

      <div className="kap bolum">
        {kategoriler.map((kat) => (
          <section key={kat} className="kategori">
            <h2>{kat}</h2>
            <div className="urun-izgara">
              {urunler
                .filter((u) => u.kategori === kat)
                .map((u, i) => (
                  <UrunKarti key={u.slug} urun={u} oncelikli={i < 4} />
                ))}
            </div>
          </section>
        ))}

        <div className="cagri">
          <h2>Fiyat listesi ister misiniz?</h2>
          <p>Güncel toptan fiyatları WhatsApp'tan hemen iletelim.</p>
          <div className="dugmeler">
            <a
              className="dugme"
              href={whatsappLink("Merhaba, güncel toptan fiyat listesini rica ediyorum.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp'tan yaz
            </a>
            <Link className="dugme ikinci" href="/iletisim#teklif">Form doldur</Link>
          </div>
        </div>
      </div>
    </>
  );
}
