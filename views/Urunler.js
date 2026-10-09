import Link from "next/link";
import SayfaUst from "@/components/SayfaUst";
import UrunFiltre from "@/components/UrunFiltre";
import { whatsappLink } from "@/data/firma";
import { kategoriler, urunler } from "@/data/urunler";
import { dilYol, yerel } from "@/lib/dil";
import { ui } from "@/lib/ui";

export default function Urunler({ lang }) {
  const t = ui(lang);
  const s = t.urunlerSayfa;

  const liste = urunler.map((u) => ({
    slug: u.slug,
    ad: yerel(u.ad, lang),
    ozet: yerel(u.ozet, lang),
    kategoriAnahtar: u.kategori,
    kategori: t.kat[u.kategori] || u.kategori,
    gramaj: u.gramaj,
    renk: u.renk,
  }));
  // sadece içinde ürün olan kategoriler
  const kullanilan = kategoriler.filter((k) => liste.some((u) => u.kategoriAnahtar === k)).map((k) => ({ anahtar: k, etiket: t.kat[k] }));

  return (
    <>
      <SayfaUst ustBaslik={s.ust} baslik={s.baslik} gorsel="/img/atmosfer/trufler-pudra.webp">
        {s.yazi}
      </SayfaUst>

      <div className="kap bolum">
        <UrunFiltre
          lang={lang}
          urunler={liste}
          kategoriler={kullanilan}
          tumu={s.tumu}
          incele={s.incele}
          altYazi={lang === "ar" ? "←" : "→"}
        />

        <div className="cagri">
          <h2>{s.cagriBaslik}</h2>
          <p>{s.cagriYazi}</p>
          <div className="dugmeler">
            <a className="dugme" href={whatsappLink(t.wa.fiyatListesi2)} target="_blank" rel="noopener noreferrer">
              {s.cagriWa}
            </a>
            <Link className="dugme ikinci" href={`${dilYol(lang, "/iletisim")}#teklif`}>
              {s.cagriForm}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
