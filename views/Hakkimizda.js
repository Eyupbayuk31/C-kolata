import Image from "next/image";
import Link from "next/link";
import SayfaUst from "@/components/SayfaUst";
import { dilYol } from "@/lib/dil";
import { doldur, ortak, ui } from "@/lib/ui";

export default function Hakkimizda({ lang }) {
  const t = ui(lang);
  const h = t.hakkimizda;
  const v = ortak(lang);

  return (
    <>
      <SayfaUst ustBaslik={h.ust} baslik={h.baslik} gorsel="/img/atmosfer/trufler-pudra.webp">
        {doldur(h.yazi, v)}
      </SayfaUst>

      <div className="kap bolum">
        <div className="iki-kolon">
          <div className="yazi-blok">
            <h2>{h.hBaslik}</h2>
            <p>{h.h1}</p>
            <p>{h.h2}</p>
            <p>{h.h3}</p>
          </div>
          <div className="foto-kutu">
            <Image
              src="/img/haber/genc-girisimci-resul-baski-hikayesi.webp"
              alt={h.fotoAlt}
              width={800}
              height={520}
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </div>
        </div>

        <div className="uc-kolon">
          {h.kutular.map((k) => (
            <div className="kutu" key={k.baslik}>
              <h3>{k.baslik}</h3>
              <p>{k.yazi}</p>
            </div>
          ))}
        </div>

        <section className="ihracat">
          <h2>{h.ihracatBaslik}</h2>
          <ul className="ulke-liste">
            {h.ulkeler.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <p>{doldur(h.ihracatYazi, v)}</p>
        </section>

        <div className="cagri">
          <h2>{h.cagriBaslik}</h2>
          <p>{h.cagriYazi}</p>
          <div className="dugmeler">
            <Link className="dugme" href={dilYol(lang, "/bayilik")}>{h.cagriBayi}</Link>
            <Link className="dugme ikinci" href={dilYol(lang, "/iletisim")}>{h.cagriIletisim}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
