import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import UrunKarti from "@/components/UrunKarti";
import { urunler, urunBul, urunGorseli } from "@/data/urunler";
import { firma, siteUrl, whatsappLink } from "@/data/firma";

export function generateStaticParams() {
  return urunler.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const urun = urunBul(slug);
  if (!urun) return {};

  const baslik = `Mr ResBaa ${urun.ad} ${urun.gramaj} – Toptan`;
  return {
    title: baslik,
    description: `${urun.aciklama.slice(0, 150).trim()}… MB Çikolata'dan toptan fiyat için bize yazın.`,
    alternates: { canonical: `/urun/${urun.slug}` },
    openGraph: {
      title: baslik,
      images: [{ url: urunGorseli(urun), width: 900, height: 900 }],
    },
  };
}

export default async function UrunSayfasi({ params }) {
  const { slug } = await params;
  const urun = urunBul(slug);
  if (!urun) notFound();

  const benzerler = urunler.filter((u) => u.slug !== urun.slug && u.kategori === urun.kategori).slice(0, 4);

  const veri = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Mr ResBaa ${urun.ad} ${urun.gramaj}`,
    description: urun.aciklama,
    image: `${siteUrl}${urunGorseli(urun)}`,
    brand: { "@type": "Brand", name: firma.marka },
    manufacturer: { "@type": "Organization", name: firma.ad },
    category: urun.kategori,
  };

  const ozellikler =
    urun.kategori === "Draje"
      ? [
          ["Marka", "Mr ResBaa"],
          ["Ambalaj", "80 gr zip-lock"],
          ["Helal sertifikası", "Var"],
          ["İlave glikoz şurubu", "Yok"],
          ["Satış", "Toptan"],
        ]
      : [
          ["Net miktar", urun.gramaj],
          ["Satış", "Toptan"],
        ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />

      <div className="kap bolum urun-sayfa" style={{ "--urun-renk": urun.renk }}>
        <nav className="kirinti" aria-label="Konum">
          <Link href="/">Anasayfa</Link> / <Link href="/urunler">Ürünler</Link> / <span>{urun.ad}</span>
        </nav>

        <div className="urun-detay">
          <div className="urun-detay-resim">
            <Image
              src={urunGorseli(urun)}
              alt={`Mr ResBaa ${urun.ad} ${urun.gramaj} ambalajı`}
              width={900}
              height={900}
              sizes="(max-width: 900px) 100vw, 520px"
              priority
            />
          </div>

          <div className="urun-detay-yazi">
            <span className="urun-ust">
              <i className="renk-nokta" aria-hidden="true" />
              Mr ResBaa · {urun.kategori}
            </span>
            <h1>{urun.ad}</h1>
            <p className="giris">{urun.aciklama}</p>

            <dl className="ozellik-tablo">
              {ozellikler.map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>

            <div className="dugmeler">
              <a
                className="dugme"
                href={whatsappLink(`Merhaba, ${urun.ad} (${urun.gramaj}) için toptan fiyat almak istiyorum.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Bu ürün için teklif al
              </a>
              <a className="dugme ikinci" href={`tel:+${firma.telefonRaw}`}>Ara: {firma.telefon}</a>
            </div>
          </div>
        </div>

        {benzerler.length > 0 && (
          <section className="kategori">
            <h2>Bunlara da bakın</h2>
            <div className="urun-izgara">
              {benzerler.map((u) => (
                <UrunKarti key={u.slug} urun={u} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
