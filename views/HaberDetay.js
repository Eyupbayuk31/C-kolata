import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { firma, siteUrl } from "@/data/firma";
import { govdeBloklari, haberBul } from "@/data/haberler";
import { dilYol, tarihYaz, yerel } from "@/lib/dil";
import { ui } from "@/lib/ui";
import { yol } from "@/lib/yol";

export default function HaberDetay({ lang, slug }) {
  const haber = haberBul(slug);
  if (!haber) notFound();

  const t = ui(lang);
  const s = t.haberlerSayfa;
  const baslik = yerel(haber.baslik, lang);
  const ozet = yerel(haber.ozet, lang);
  const bloklar = govdeBloklari(yerel(haber.govde, lang));

  const veri = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: baslik,
    datePublished: haber.tarih,
    description: ozet,
    inLanguage: lang,
    author: { "@type": "Organization", name: firma.ad },
    publisher: { "@type": "Organization", name: firma.ad },
    ...(haber.gorsel && { image: `${siteUrl}${haber.gorsel}` }),
  };

  return (
    <article className="makale-sayfa">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />

      <div className="kap makale">
        <nav className="kirinti" aria-label={s.kirintiAria}>
          <Link href={dilYol(lang, "/")}>{s.anasayfa}</Link> / <Link href={dilYol(lang, "/haberler")}>{t.nav.haberler}</Link> / <span>{baslik}</span>
        </nav>

        <span className="etiket">
          {t.haberKat[haber.kategori]} · {tarihYaz(haber.tarih, lang)}
        </span>
        <h1>{baslik}</h1>
        <p className="makale-ozet">{ozet}</p>

        {haber.video ? (
          <video className="makale-video" controls playsInline preload="none" poster={haber.gorsel ? yol(haber.gorsel) : undefined}>
            <source src={yol(haber.video)} type="video/mp4" />
          </video>
        ) : (
          haber.gorsel && (
            <Image className="makale-resim" src={haber.gorsel} alt={baslik} width={1200} height={680} sizes="(max-width: 900px) 100vw, 800px" priority />
          )
        )}

        {bloklar.map((b, i) =>
          b.tur === "baslik" ? (
            <h2 key={i}>{b.metin}</h2>
          ) : b.tur === "liste" ? (
            <ul key={i} className="makale-liste">
              {b.maddeler.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          ) : (
            <p key={i}>{b.metin}</p>
          )
        )}

        <p className="makale-geri">
          <Link href={dilYol(lang, "/haberler")} className="ok-link">
            <span aria-hidden="true">{lang === "ar" ? "→" : "←"}</span> {s.tumu}
          </Link>
        </p>
      </div>
    </article>
  );
}
