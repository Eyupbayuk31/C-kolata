import SayfaUst from "@/components/SayfaUst";
import TeklifFormu from "@/components/TeklifFormu";
import { firma } from "@/data/firma";
import { ui } from "@/lib/ui";
import { yol } from "@/lib/yol";

export default function Bayilik({ lang }) {
  const t = ui(lang);
  const s = t.bayilikSayfa;

  return (
    <>
      <SayfaUst ustBaslik={s.ust} baslik={s.baslik}>
        {s.yazi}
      </SayfaUst>

      <div className="kap bolum">
        <div className="iletisim-izgara">
          <div className="yazi-blok">
            <h2>{s.hBaslik}</h2>
            <ul className="ozellik-liste">
              {s.liste.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p>{s.p1}</p>
            <p>
              {s.p2a}{" "}
              <a href={yol("/Katalog.pdf")} target="_blank" rel="noopener">
                {s.p2link}
              </a>
              .
            </p>
          </div>

          <div>
            <h2>{s.form}</h2>
            <TeklifFormu lang={lang} f={t.form} wa={firma.telefonRaw} eposta={firma.eposta} bayilik />
          </div>
        </div>
      </div>
    </>
  );
}
