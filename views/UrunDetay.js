import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import UrunKarti from "@/components/UrunKarti";
import { firma, siteUrl, whatsappLink } from "@/data/firma";
import { urunBul, urunler } from "@/data/urunler";
import { dilYol, yerel } from "@/lib/dil";
import { urunGorseli } from "@/lib/gorsel";
import { doldur, ui } from "@/lib/ui";

export default function UrunDetay({ lang, slug }) {
  const urun = urunBul(slug);
  if (!urun) notFound();

  const t = ui(lang);
  const d = t.urunDetay;
  const ad = yerel(urun.ad, lang);
  const aciklama = yerel(urun.aciklama, lang);
  const ok = lang === "ar" ? "←" : "→";

  const kart = (u) => ({
    slug: u.slug,
    ad: yerel(u.ad, lang),
    ozet: yerel(u.ozet, lang),
    kategori: t.kat[u.kategori] || u.kategori,
    gramaj: u.gramaj,
    renk: u.renk,
  });
  const benzerler = urunler.filter((u) => u.slug !== urun.slug && u.kategori === urun.kategori).slice(0, 4);

  const veri = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Mr ResBaa ${ad} ${urun.gramaj}`,
    description: aciklama,
    image: `${siteUrl}${urunGorseli(urun)}`,
    brand: { "@type": "Brand", name: firma.marka },
    manufacturer: { "@type": "Organization", name: firma.ad },
    category: t.kat[urun.kategori],
  };

  const ozellikler =
    urun.kategori === "draje"
      ? [
          [d.marka, "Mr ResBaa"],
          [d.ambalaj, d.ambalajDeger],
          [d.helal, d.var],
          [d.glikoz, d.yok],
          [d.satis, d.toptan],
        ]
      : [
          [d.netMiktar, urun.gramaj],
          [d.satis, d.toptan],
        ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />

      <div className="kap bolum urun-sayfa" style={{ "--urun-renk": urun.renk }}>
        <nav className="kirinti" aria-label={d.kirintiAria}>
          <Link href={dilYol(lang, "/")}>{d.kirintiAna}</Link> / <Link href={dilYol(lang, "/urunler")}>{t.nav.urunler}</Link> / <span>{ad}</span>
        </nav>

        <div className="urun-detay">
          <div className="urun-detay-resim">
            <Image
              src={urunGorseli(urun)}
              alt={doldur(d.resimAlt, { ad, gramaj: urun.gramaj })}
              width={900}
              height={900}
              sizes="(max-width: 900px) 100vw, 520px"
              priority
            />
          </div>

          <div className="urun-detay-yazi">
            <span className="urun-ust">
              <i className="renk-nokta" aria-hidden="true" />
              Mr ResBaa · {t.kat[urun.kategori]}
            </span>
            <h1>{ad}</h1>
            <p className="giris">{aciklama}</p>

            <dl className="ozellik-tablo">
              {ozellikler.map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>

            <div className="dugmeler">
              <a className="dugme" href={whatsappLink(doldur(t.wa.urun, { ad, gramaj: urun.gramaj }))} target="_blank" rel="noopener noreferrer">
                {d.teklif}
              </a>
              <a className="dugme ikinci" href={`tel:+${firma.telefonRaw}`}>
                {doldur(d.ara, { tel: "" })}
                <bdi dir="ltr">{firma.telefon}</bdi>
              </a>
            </div>
          </div>
        </div>

        {benzerler.length > 0 && (
          <section className="kategori">
            <h2>{d.benzer}</h2>
            <div className="urun-izgara">
              {benzerler.map((u) => (
                <UrunKarti key={u.slug} urun={kart(u)} lang={lang} incele={t.urunlerSayfa.incele} altYazi={ok} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
