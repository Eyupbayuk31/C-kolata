import Metin from "@/components/Metin";
import SayfaUst from "@/components/SayfaUst";
import { ortak, ui } from "@/lib/ui";

export default function YasalSayfa({ lang, anahtar }) {
  const t = ui(lang);
  const y = t.yasal;
  const sayfa = y[anahtar];
  const degerler = ortak(lang);

  return (
    <>
      <SayfaUst ustBaslik={y.ust} baslik={sayfa.baslik}>
        {y.guncelleme}: {y.tarih}
      </SayfaUst>
      <div className="kap bolum">
        <div className="yasal-metin">
          {y.not && <p className="yasal-not">{y.not}</p>}
          {sayfa.blok.map(([tur, metin], i) =>
            tur === "h" ? (
              <h2 key={i}>{metin}</h2>
            ) : (
              <p key={i}>
                <Metin metin={metin} lang={lang} vars={degerler} />
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}
