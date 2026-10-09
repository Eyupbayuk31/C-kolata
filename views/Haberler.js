import Image from "next/image";
import Link from "next/link";
import Belir from "@/components/Belir";
import SayfaUst from "@/components/SayfaUst";
import { haberler } from "@/data/haberler";
import { dilYol, tarihYaz, yerel } from "@/lib/dil";
import { ui } from "@/lib/ui";

export default function Haberler({ lang }) {
  const t = ui(lang);
  const s = t.haberlerSayfa;

  return (
    <>
      <SayfaUst ustBaslik={s.ust} baslik={s.baslik}>
        {s.yazi}
      </SayfaUst>

      <div className="kap bolum">
        <div className="haber-izgara">
          {haberler.map((h, i) => (
            <Belir key={h.slug} gecikme={(i % 3) * 100}>
              <Link href={dilYol(lang, `/haberler/${h.slug}`)} className="haber-karti">
                {h.gorsel ? (
                  <div className="haber-resim">
                    <Image src={h.gorsel} alt="" width={600} height={340} sizes="(max-width: 900px) 100vw, 360px" />
                  </div>
                ) : (
                  <div className="haber-bos" aria-hidden="true">{t.haberKat[h.kategori]}</div>
                )}
                <div className="haber-yazi">
                  <span className="etiket">
                    {t.haberKat[h.kategori]} · {tarihYaz(h.tarih, lang)}
                  </span>
                  <h2>{yerel(h.baslik, lang)}</h2>
                  <p>{yerel(h.ozet, lang)}</p>
                </div>
              </Link>
            </Belir>
          ))}
        </div>
      </div>
    </>
  );
}
