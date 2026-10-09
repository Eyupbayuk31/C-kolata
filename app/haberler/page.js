import Image from "next/image";
import Link from "next/link";
import { haberler, tarihYaz } from "@/data/haberler";

export const metadata = {
  title: "Haberler",
  description: "MB Çikolata'dan son haberler: fuarlar, yeni tesis, ihracat ve yeni ürünler.",
  alternates: { canonical: "/haberler" },
};

export default function Haberler() {
  return (
    <>
      <section className="sayfa-ust">
        <div className="kap">
          <h1>Haberler</h1>
          <p>Fuarlar, yatırımlar, ihracat ve yeni ürünler.</p>
        </div>
      </section>

      <div className="kap bolum">
        <div className="haber-izgara">
          {haberler.map((h) => (
            <Link key={h.slug} href={`/haberler/${h.slug}`} className="haber-karti">
              {h.gorsel ? (
                  <Image src={h.gorsel} alt="" width={600} height={340} sizes="(max-width: 900px) 100vw, 360px" />
                ) : (
                  <div className="haber-bos" aria-hidden="true">{h.kategori}</div>
                )}
              <div>
                <span className="etiket">{h.kategori} · {tarihYaz(h.tarih)}</span>
                <h2>{h.baslik}</h2>
                <p>{h.ozet}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
