import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { haberler, haberBul, tarihYaz } from "@/data/haberler";
import { firma, siteUrl } from "@/data/firma";
import { yol } from "@/lib/yol";

export function generateStaticParams() {
  return haberler.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const haber = haberBul(slug);
  if (!haber) return {};
  return {
    title: haber.baslik,
    description: haber.ozet,
    alternates: { canonical: `/haberler/${haber.slug}` },
    openGraph: {
      type: "article",
      title: haber.baslik,
      description: haber.ozet,
      publishedTime: haber.tarih,
      ...(haber.gorsel && { images: [haber.gorsel] }),
    },
  };
}

export default async function HaberSayfasi({ params }) {
  const { slug } = await params;
  const haber = haberBul(slug);
  if (!haber) notFound();

  const veri = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: haber.baslik,
    datePublished: haber.tarih,
    description: haber.ozet,
    author: { "@type": "Organization", name: firma.ad },
    publisher: { "@type": "Organization", name: firma.ad },
    ...(haber.gorsel && { image: `${siteUrl}${haber.gorsel}` }),
  };

  return (
    <article className="makale-sayfa">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />

      <div className="kap makale">
        <nav className="kirinti" aria-label="Konum">
          <Link href="/">Anasayfa</Link> / <Link href="/haberler">Haberler</Link> / <span>{haber.baslik}</span>
        </nav>

        <span className="etiket">{haber.kategori} · {tarihYaz(haber.tarih)}</span>
        <h1>{haber.baslik}</h1>
        <p className="makale-ozet">{haber.ozet}</p>

        {haber.video ? (
          <video
            className="makale-video"
            controls
            playsInline
            preload="none"
            poster={yol(haber.gorsel)}
          >
            <source src={yol(haber.video)} type="video/mp4" />
          </video>
        ) : (
          haber.gorsel && (
            <Image
              className="makale-resim"
              src={haber.gorsel}
              alt={haber.baslik}
              width={1200}
              height={680}
              sizes="(max-width: 900px) 100vw, 800px"
              priority
            />
          )
        )}

        {haber.bolumler.map((b, i) => (
          <section key={i}>
            {b.baslik && <h2>{b.baslik}</h2>}
            {b.paragraflar.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}

        {haber.bilgi && (
          <dl className="ozellik-tablo">
            {haber.bilgi.map(([a, b]) => (
              <div key={a}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="makale-geri">
          <Link href="/haberler" className="ok-link">
            <span aria-hidden="true">←</span> Tüm haberler
          </Link>
        </p>
      </div>
    </article>
  );
}
