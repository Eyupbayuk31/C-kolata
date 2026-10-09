import SayfaUst from "@/components/SayfaUst";
import TeklifFormu from "@/components/TeklifFormu";
import { firma, whatsappLink } from "@/data/firma";
import { yerel } from "@/lib/dil";
import { ui } from "@/lib/ui";

const haritaAdresi = encodeURIComponent("Şuhut OSB 1. Cadde 5. Sokak No:4 Belkaracaören Afyonkarahisar");

export default function Iletisim({ lang }) {
  const t = ui(lang);
  const s = t.iletisimSayfa;

  return (
    <>
      <SayfaUst ustBaslik={s.ust} baslik={s.baslik}>
        {s.yazi}
      </SayfaUst>

      <div className="kap bolum">
        <div className="iletisim-izgara">
          <div className="iletisim-bilgi">
            <h2>{s.fabrika}</h2>
            <p>{yerel(firma.adres, lang)}</p>

            <h2>{s.telefon}</h2>
            <p>
              <a href={`tel:+${firma.telefonRaw}`} dir="ltr">{firma.telefon}</a>
              <br />
              <a href={`tel:+${firma.telefon2Raw}`} dir="ltr">{firma.telefon2}</a>
            </p>

            <h2>{s.eposta}</h2>
            <p><a href={`mailto:${firma.eposta}`}>{firma.eposta}</a></p>

            <h2>{s.saatler}</h2>
            <dl className="saatler">
              {firma.saatler.map((x, i) => (
                <div key={i}>
                  <dt>{yerel(x.gun, lang)}</dt>
                  <dd>{yerel(x.saat, lang)}</dd>
                </div>
              ))}
            </dl>

            <a className="dugme" href={whatsappLink(t.wa.bilgiKisa)} target="_blank" rel="noopener noreferrer">
              {s.wa}
            </a>
          </div>

          <div id="teklif">
            <h2>{s.teklif}</h2>
            <TeklifFormu lang={lang} f={t.form} wa={firma.telefonRaw} eposta={firma.eposta} />
          </div>
        </div>

        <iframe
          className="harita"
          title={s.harita}
          src={`https://www.google.com/maps?q=${haritaAdresi}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
