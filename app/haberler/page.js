import SayfaUst from "@/components/SayfaUst";
import Image from "next/image";
import Belir from "@/components/Belir";
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
      <SayfaUst ustBaslik="MB Çikolata'dan" baslik="Haberler">
        Fuarlar, yatırımlar, ihracat ve yeni ürünler.
      </SayfaUst>

      <div className="kap bolum">
        <div className="haber-izgara">
          {haberler.map((h, i) => (
            <Belir key={h.slug} gecikme={(i % 3) * 100}>
              <Link href={`/haberler/${h.slug}`} className="haber-karti">
                {h.gorsel ? (
                  <div className="haber-resim">
                    <Image src={h.gorsel} alt="" width={600} height={340} sizes="(max-width: 900px) 100vw, 360px" />
                  </div>
                ) : (
                  <div className="haber-bos" aria-hidden="true">{h.kategori}</div>
                )}
                <div className="haber-yazi">
                  <span className="etiket">{h.kategori} · {tarihYaz(h.tarih)}</span>
                  <h2>{h.baslik}</h2>
                  <p>{h.ozet}</p>
                </div>
              </Link>
            </Belir>
          ))}
        </div>
      </div>
    </>
  );
}
