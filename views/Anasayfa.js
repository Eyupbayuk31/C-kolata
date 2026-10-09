import Image from "next/image";
import Link from "next/link";
import Belir from "@/components/Belir";
import Damla from "@/components/Damla";
import Rozet from "@/components/Rozet";
import Sayac from "@/components/Sayac";
import Sss from "@/components/Sss";
import Toz from "@/components/Toz";
import UrunKarti from "@/components/UrunKarti";
import { firma, whatsappLink } from "@/data/firma";
import { haberler } from "@/data/haberler";
import { urunler, urunBul } from "@/data/urunler";
import { dilYol, tarihYaz, yerel } from "@/lib/dil";
import { urunGorseli } from "@/lib/gorsel";
import { doldur, ortak, ui } from "@/lib/ui";
import { yol } from "@/lib/yol";

const ozellikIkonlari = [
  <path key="a" d="M24 40c0-9 2-16 8-22M24 40c-1-8-6-13-14-14 1 8 6 13 14 14Zm0 0c4-6 4-14 0-22-4 8-4 16 0 22Zm8-22c-6 0-9 3-9 9" />,
  <path key="b" d="M10 18h28v20H10zM10 18l4-8h20l4 8M20 24h8" />,
  <g key="c">
    <ellipse cx="24" cy="24" rx="9" ry="15" transform="rotate(-25 24 24)" />
    <path d="M19 12c3 7 3 17 10 24" />
  </g>,
];

const vitrinSlug = ["mr-resbaa-findikli-draje-80gr", "mr-resbaa-binbonbon-draje-80gr"];
const secilenSlug = [
  "mr-resbaa-bogurtlen-draje-80gr",
  "mr-resbaa-biskuvili-draje-80gr",
  "mr-resbaa-cikolata-taslari-draje-80gr",
  "mr-resbaa-binbonbon-draje-80gr",
  "mr-resbaa-antep-fistikli-draje-80gr",
  "mr-resbaa-kirazli-draje-80gr",
  "mr-resbaa-kahve-cekirdekli-draje-80gr",
  "mr-resbaa-bademli-draje-80gr",
];

export default function Anasayfa({ lang }) {
  const t = ui(lang);
  const a = t.ana;
  const v = ortak(lang);
  const ok = lang === "ar" ? "←" : "→";

  // panelden ürün silinirse sayfa bozulmasın: bulunamayanı atla, eksik kalırsa ilk ürünlerle doldur
  const vitrin = vitrinSlug.map(urunBul).filter(Boolean);
  const secilenler = secilenSlug.map(urunBul).filter(Boolean);
  for (const u of urunler) {
    if (secilenler.length >= 8) break;
    if (!secilenler.includes(u)) secilenler.push(u);
  }

  const kartVerisi = (u) => ({
    slug: u.slug,
    ad: yerel(u.ad, lang),
    ozet: yerel(u.ozet, lang),
    kategori: t.kat[u.kategori] || u.kategori,
    gramaj: u.gramaj,
    renk: u.renk,
  });

  return (
    <>
      {/* ---------- vitrin ---------- */}
      <section className="kahraman" style={{ "--kahraman-gorsel": `url(${yol("/img/atmosfer/trufler-altin.webp")})` }}>
        <Toz />
        <div className="kap kahraman-ic">
          <div className="kahraman-yazi">
            <p className="ust-baslik giris-1">{doldur(a.eyebrow, v)}</p>
            <h1 className="giris-2">
              {a.h1a}
              <em className="altin-yazi">{a.h1vurgu}</em>
              {a.h1b}
            </h1>
            <p className="kahraman-alt giris-3">{doldur(a.altYazi, v)}</p>
            <div className="dugmeler giris-4">
              <Link href={dilYol(lang, "/urunler")} className="dugme">
                {a.btnUrun}
              </Link>
              <a href={whatsappLink(t.wa.fiyatListesi)} className="dugme ikinci" target="_blank" rel="noopener noreferrer">
                {a.btnFiyat}
              </a>
            </div>
            <ul className="guven giris-4">
              {a.guven.map(([x, y]) => (
                <li key={y}>
                  <strong>{doldur(x, v)}</strong>
                  <span>{y}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="kemer-alani giris-5">
            <div className="kemer">
              <video autoPlay muted loop playsInline preload="metadata" poster={yol("/video/mb-cikolata-kapak.webp")} aria-label={a.videoAria}>
                <source src={yol("/video/mb-cikolata.mp4")} type="video/mp4" />
              </video>
            </div>
            {vitrin.map((u, i) => (
              <div key={u.slug} className={`kemer-paket kemer-paket-${i + 1}`} style={{ "--urun-renk": u.renk }}>
                <Image src={urunGorseli(u)} alt={doldur(a.paketAlt, { ad: yerel(u.ad, lang) })} width={300} height={300} priority />
              </div>
            ))}
            <Rozet yazi={a.rozet} />
          </div>
        </div>
        <a href="#lezzetler" className="asagi" aria-label={a.asagi}>
          <span />
        </a>
      </section>

      <Damla ust="#120d0a" alt="var(--zemin)" />

      {/* ---------- akan lezzet şeridi ---------- */}
      <div className="serit" id="lezzetler" aria-label={a.seritAria}>
        <div className="serit-ic">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1}>
              {a.lezzetler.map((l) => (
                <span key={l}>
                  {l}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- tanıtım ---------- */}
      <section className="bolum">
        <div className="kap tanitim">
          <Belir className="tanitim-yazi">
            <p className="ust-baslik">{a.tanitimUst}</p>
            <h2>
              {a.tanitimBas1} <em className="altin-yazi">{a.tanitimVurgu}</em> {a.tanitimBas2}
            </h2>
            <p>{a.tanitimYazi}</p>
            <a href={yol("/Katalog.pdf")} className="katalog-link" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              {a.katalog}
            </a>
          </Belir>

          <Belir className="tanitim-kutu" gecikme={120}>
            <div className="kutu-hale" />
            <Image src="/img/atmosfer/hediye-kutusu.webp" alt={a.kutuAlt} width={612} height={407} sizes="(max-width: 900px) 90vw, 480px" />
          </Belir>

          <ul className="tanitim-ozellik">
            {a.ozellikler.map((o, i) => (
              <Belir as="li" key={o.baslik} gecikme={200 + i * 120}>
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="23" />
                  <g>{ozellikIkonlari[i]}</g>
                </svg>
                <div>
                  <h3>{o.baslik}</h3>
                  <p>{o.yazi}</p>
                </div>
              </Belir>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- büyük cümle ---------- */}
      <section className="bildiri" style={{ "--cizim": `url(${yol("/img/atmosfer/kakao-cizim.webp")})` }}>
        <Belir className="kap">
          <span className="elmas" aria-hidden="true" />
          <h2>
            {a.bildiri1}
            <br />
            <em className="altin-yazi">{a.bildiriVurgu}</em> {a.bildiri2}
          </h2>
        </Belir>
      </section>

      {/* ---------- ürünler ---------- */}
      <section className="bolum">
        <div className="kap">
          <Belir className="bolum-baslik ortali">
            <p className="ust-baslik">{a.urunUst}</p>
            <h2>{a.urunBaslik}</h2>
            <p>{a.urunYazi}</p>
          </Belir>
          <div className="urun-izgara">
            {secilenler.map((u, i) => (
              <Belir key={u.slug} gecikme={(i % 4) * 90}>
                <UrunKarti urun={kartVerisi(u)} lang={lang} incele={t.urunlerSayfa.incele} altYazi={ok} />
              </Belir>
            ))}
          </div>
          <div className="ortala">
            <Link href={dilYol(lang, "/urunler")} className="dugme ikinci">
              {doldur(a.tumUrunler, { n: urunler.length })}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- sipariş adımları ---------- */}
      <section className="bolum koyu">
        <div className="kap">
          <Belir className="bolum-baslik ortali">
            <p className="ust-baslik">{a.adimUst}</p>
            <h2>{a.adimBaslik}</h2>
          </Belir>
          <ol className="adimlar">
            {a.adimlar.map((x, i) => (
              <Belir as="li" key={x.baslik} gecikme={i * 120} className="adim">
                <span className="adim-no" aria-hidden="true">{i + 1}</span>
                <h3>{x.baslik}</h3>
                <p>{x.yazi}</p>
              </Belir>
            ))}
          </ol>
          <div className="ortala">
            <a href={whatsappLink(t.wa.fiyatListesi)} className="dugme" target="_blank" rel="noopener noreferrer">
              {a.btnFiyat}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- rakamlar ---------- */}
      <section className="rakamlar" style={{ "--rakam-gorsel": `url(${yol("/img/atmosfer/trufler-pudra.webp")})` }}>
        <div className="kap rakam-izgara">
          {firma.rakamlar.map((r, i) => (
            <Belir key={r.id} gecikme={i * 110} className="rakam">
              <strong>
                <Sayac hedef={Number(r.sayi)} />
              </strong>
              <span>{yerel(r.etiket, lang)}</span>
            </Belir>
          ))}
        </div>
      </section>

      {/* ---------- kurucunun mektubu ---------- */}
      <section className="mektup">
        <div className="mektup-resim">
          <Image src="/img/atmosfer/cilek.webp" alt={a.mektupAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <Belir className="mektup-yazi">
          <p className="ust-baslik">{a.mektupUst}</p>
          <p className="ilk">{a.mektup1}</p>
          <p>{doldur(a.mektup2, v)}</p>
          <p>{a.mektup3}</p>
          <p className="imza-not">{a.imzaNot}</p>
          <p className="imza" dir="ltr">{a.imzaAd}</p>
          <p className="imza-unvan">{a.imzaUnvan}</p>
        </Belir>
      </section>

      {/* ---------- tesis ---------- */}
      <section className="bolum">
        <div className="kap tesis">
          <Belir>
            <p className="ust-baslik">{a.tesisUst}</p>
            <h2>{a.tesisBaslik}</h2>
            <p>{a.tesisYazi}</p>
            <Link href={dilYol(lang, "/hakkimizda")} className="ok-link">
              {a.tesisLink} <span aria-hidden="true">{ok}</span>
            </Link>
          </Belir>
          <dl className="tesis-bilgi">
            {a.tesisBilgi.map(([x, y], i) => (
              <Belir key={y} gecikme={i * 90}>
                <dt>{x}</dt>
                <dd>{y}</dd>
              </Belir>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- haberler ---------- */}
      <section className="bolum koyu">
        <div className="kap">
          <Belir className="bolum-baslik baslik-satir">
            <div>
              <p className="ust-baslik">{a.haberUst}</p>
              <h2>{a.haberBaslik}</h2>
            </div>
            <Link href={dilYol(lang, "/haberler")} className="ok-link">
              {a.haberTum} <span aria-hidden="true">{ok}</span>
            </Link>
          </Belir>
          <div className="haber-izgara">
            {haberler.slice(0, 3).map((h, i) => (
              <Belir key={h.slug} gecikme={i * 100}>
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
                    <h3>{yerel(h.baslik, lang)}</h3>
                    <p>{yerel(h.ozet, lang)}</p>
                  </div>
                </Link>
              </Belir>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sık sorulanlar ---------- */}
      <section className="bolum">
        <div className="kap">
          <Belir className="bolum-baslik ortali">
            <p className="ust-baslik">{a.sssUst}</p>
            <h2>{a.sssBaslik}</h2>
          </Belir>
          <Belir>
            <Sss maddeler={a.sss} degerler={v} />
          </Belir>
        </div>
      </section>
    </>
  );
}
