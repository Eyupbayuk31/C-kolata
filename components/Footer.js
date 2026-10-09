import Image from "next/image";
import Link from "next/link";
import Damla from "@/components/Damla";
import { firma, whatsappLink } from "@/data/firma";
import { dilYol, yerel } from "@/lib/dil";
import { doldur, ortak, ui } from "@/lib/ui";
import { yol } from "@/lib/yol";

export default function Footer({ lang }) {
  const t = ui(lang);
  const a = t.alt;
  const yil = new Date().getFullYear();
  const resmi = [
    firma.ticariUnvan,
    firma.vergiDairesi && `${firma.vergiDairesi} ${a.vd}`,
    firma.vergiNo && `${a.vn}: ${firma.vergiNo}`,
    firma.mersisNo && `${a.mersis}: ${firma.mersisNo}`,
  ].filter(Boolean);

  return (
    <footer className="alt">
      <Damla ust="var(--zemin)" alt="var(--alt-zemin)" ters />

      <div className="kap alt-cagri">
        <p className="ust-baslik">{a.cagriUst}</p>
        <h2>
          {a.cagri1} <em>{a.cagriVurgu}</em> {a.cagri2}
        </h2>
        <div className="dugmeler">
          <a className="dugme" href={whatsappLink(t.wa.fiyatListesi)} target="_blank" rel="noopener noreferrer">
            {a.fiyatListesi}
          </a>
          <Link className="dugme ikinci" href={dilYol(lang, "/bayilik")}>
            {a.bayiOlun}
          </Link>
        </div>
      </div>

      <div className="kap alt-izgara">
        <div>
          <Image src="/img/logo.webp" alt="MB Çikolata" width={150} height={56} />
          <p className="alt-yazi">{doldur(a.tanitim, ortak(lang))}</p>
          <p className="sosyal">
            <a href={firma.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={firma.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </p>
        </div>

        <div>
          <h3>{a.kesfet}</h3>
          <ul>
            <li><Link href={dilYol(lang, "/urunler")}>{t.nav.urunler}</Link></li>
            <li><Link href={dilYol(lang, "/hakkimizda")}>{t.nav.hakkimizda}</Link></li>
            <li><Link href={dilYol(lang, "/haberler")}>{t.nav.haberler}</Link></li>
            <li><Link href={dilYol(lang, "/bayilik")}>{a.bayilikBasvuru}</Link></li>
            <li><a href={yol("/Katalog.pdf")} target="_blank" rel="noopener">{a.katalog}</a></li>
          </ul>
        </div>

        <div>
          <h3>{a.iletisim}</h3>
          <ul>
            <li><a href={`tel:+${firma.telefonRaw}`} dir="ltr">{firma.telefon}</a></li>
            <li><a href={`tel:+${firma.telefon2Raw}`} dir="ltr">{firma.telefon2}</a></li>
            <li><a href={`mailto:${firma.eposta}`}>{firma.eposta}</a></li>
            <li className="adres">{yerel(firma.adres, lang)}</li>
          </ul>
        </div>
      </div>

      <div className="kap alt-son">
        <p>
          © {yil} {firma.ad}. {a.haklar}
          {resmi.length > 0 && <span> · {resmi.join(" · ")}</span>}
        </p>
        <p className="yasal">
          <Link href={dilYol(lang, "/kvkk")}>{a.kvkk}</Link>
          <Link href={dilYol(lang, "/gizlilik-politikasi")}>{a.gizlilik}</Link>
          <Link href={dilYol(lang, "/cerez-politikasi")}>{a.cerezler}</Link>
        </p>
      </div>
    </footer>
  );
}
