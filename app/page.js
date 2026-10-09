import Image from "next/image";
import Link from "next/link";
import Belir from "@/components/Belir";
import Damla from "@/components/Damla";
import Rozet from "@/components/Rozet";
import Sayac from "@/components/Sayac";
import UrunKarti from "@/components/UrunKarti";
import { urunler, urunGorseli, urunBul } from "@/data/urunler";
import { haberler, tarihYaz } from "@/data/haberler";
import { whatsappLink } from "@/data/firma";
import { yol } from "@/lib/yol";

export const metadata = {
  alternates: { canonical: "/" },
};

const vitrin = urunBul("mr-resbaa-findikli-draje-80gr");
const vitrin2 = urunBul("mr-resbaa-binbonbon-draje-80gr");

const secilenler = [
  "mr-resbaa-bogurtlen-draje-80gr",
  "mr-resbaa-biskuvili-draje-80gr",
  "mr-resbaa-cikolata-taslari-draje-80gr",
  "mr-resbaa-binbonbon-draje-80gr",
  "mr-resbaa-antep-fistikli-draje-80gr",
  "mr-resbaa-kirazli-draje-80gr",
  "mr-resbaa-kahve-cekirdekli-draje-80gr",
  "mr-resbaa-bademli-draje-80gr",
].map(urunBul);

const lezzetler = [
  "Fındık", "Antep fıstığı", "Badem", "Mango", "Çilek", "Vişne",
  "Böğürtlen", "Kahve çekirdeği", "Bisküvi", "BinBonBon", "Çikolata taşları",
];

const rakamlar = [
  [29, "Çikolata çeşidi"],
  [26, "Draje çeşidi"],
  [14, "Yıllık tecrübe"],
  [11, "Ülkeye ihracat"],
];

const ozellikler = [
  {
    baslik: "Doğal ürünler",
    yazi: "Kullandığımız malzemelerde doğallığı önemsiyoruz. Meyveler dondurularak kurutuluyor.",
    ikon: (
      <path d="M24 40c0-9 2-16 8-22M24 40c-1-8-6-13-14-14 1 8 6 13 14 14Zm0 0c4-6 4-14 0-22-4 8-4 16 0 22Zm8-22c-6 0-9 3-9 9" />
    ),
  },
  {
    baslik: "Özenli paketleme",
    yazi: "Ürünlerimiz el değmeden üretilir, hijyenik koşullarda tekrar kapanabilen zip-lock ambalajla size ulaşır.",
    ikon: <path d="M10 18h28v20H10zM10 18l4-8h20l4 8M20 24h8" />,
  },
  {
    baslik: "Kaliteli kakao",
    yazi: "Helal sertifikalı, ilave glikoz şurubu içermeyen tariflerle kaliteli kakaodan üretiyoruz.",
    ikon: (
      <>
        <ellipse cx="24" cy="24" rx="9" ry="15" transform="rotate(-25 24 24)" />
        <path d="M19 12c3 7 3 17 10 24" />
      </>
    ),
  },
];

export default function Anasayfa() {
  return (
    <>
      {/* ---------- vitrin ---------- */}
      <section className="kahraman" style={{ "--kahraman-gorsel": `url(${yol("/img/atmosfer/trufler-altin.webp")})` }}>
        <div className="kap kahraman-ic">
          <div className="kahraman-yazi">
            <p className="ust-baslik giris-1">Afyonkarahisar · 14 yıllık ustalık</p>
            <h1 className="giris-2">
              Tatlı anlar için
              <em className="altin-yazi">en lezzetli</em>
              çikolatalar.
            </h1>
            <p className="kahraman-alt giris-3">
              Fındıktan Antep fıstığına, dondurularak kurutulmuş meyveden kahve çekirdeğine; helal
              sertifikalı drajelerimizi kendi tesisimizde üretip 11 ülkeye gönderiyoruz.
            </p>
            <div className="dugmeler giris-4">
              <Link href="/urunler" className="dugme">Ürünleri keşfet</Link>
              <a
                href={whatsappLink("Merhaba, toptan fiyat listesi almak istiyorum.")}
                className="dugme ikinci"
                target="_blank"
                rel="noopener noreferrer"
              >
                Toptan fiyat al
              </a>
            </div>
          </div>

          <div className="kemer-alani giris-5">
            <div className="kemer">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={yol("/video/mb-cikolata-kapak.webp")}
                aria-label="Erimiş çikolata, MB Chocolate"
              >
                <source src={yol("/video/mb-cikolata.mp4")} type="video/mp4" />
              </video>
            </div>
            <div className="kemer-paket kemer-paket-1" style={{ "--urun-renk": vitrin.renk }}>
              <Image src={urunGorseli(vitrin)} alt={`${vitrin.ad} paketi`} width={300} height={300} priority />
            </div>
            <div className="kemer-paket kemer-paket-2" style={{ "--urun-renk": vitrin2.renk }}>
              <Image src={urunGorseli(vitrin2)} alt={`${vitrin2.ad} paketi`} width={300} height={300} priority />
            </div>
            <Rozet />
          </div>
        </div>
        <a href="#lezzetler" className="asagi" aria-label="Aşağı kaydır">
          <span />
        </a>
      </section>

      <Damla ust="#120d0a" alt="var(--zemin)" />

      {/* ---------- akan lezzet şeridi ---------- */}
      <div className="serit" id="lezzetler" aria-label="Lezzetlerimiz">
        <div className="serit-ic">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1}>
              {lezzetler.map((l) => (
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
            <p className="ust-baslik">Lezzet tutkunları için</p>
            <h2>
              Mb Çikolata, <em className="altin-yazi">eşsiz tatlar</em> üretiyor.
            </h2>
            <p>
              Lezzetlerimizi ve ürün çeşitlerimizi yakından incelemek için kataloğumuzu indirin.
              Toptan alımda ürün karması, koli içeriği ve sevkiyat için bize yazmanız yeterli.
            </p>
            <a href={yol("/Katalog.pdf")} className="katalog-link" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              Online katalog (PDF)
            </a>
          </Belir>

          <Belir className="tanitim-kutu" gecikme={120}>
            <div className="kutu-hale" />
            <Image
              src="/img/atmosfer/hediye-kutusu.webp"
              alt="MB Çikolata hediyelik çikolata kutusu"
              width={612}
              height={407}
              sizes="(max-width: 900px) 90vw, 480px"
            />
          </Belir>

          <ul className="tanitim-ozellik">
            {ozellikler.map((o, i) => (
              <Belir as="li" key={o.baslik} gecikme={200 + i * 120}>
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="23" />
                  <g>{o.ikon}</g>
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
            Mb Çikolata olarak
            <br />
            <em className="altin-yazi">lezzetli</em> ürünler sunuyoruz.
          </h2>
        </Belir>
      </section>

      {/* ---------- ürünler ---------- */}
      <section className="bolum">
        <div className="kap">
          <Belir className="bolum-baslik ortali">
            <p className="ust-baslik">Mr ResBaa serisi</p>
            <h2>Lezzetlerimizi keşfedin</h2>
            <p>Sütlü ve beyaz çikolata kaplı 12 draje, kakaolu fındık kreması ve çıtır patatesli çikolata.</p>
          </Belir>
          <div className="urun-izgara">
            {secilenler.map((u, i) => (
              <Belir key={u.slug} gecikme={(i % 4) * 90}>
                <UrunKarti urun={u} />
              </Belir>
            ))}
          </div>
          <div className="ortala">
            <Link href="/urunler" className="dugme ikinci">
              Tüm ürünler ({urunler.length})
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- rakamlar ---------- */}
      <section className="rakamlar" style={{ "--rakam-gorsel": `url(${yol("/img/atmosfer/trufler-pudra.webp")})` }}>
        <div className="kap rakam-izgara">
          {rakamlar.map(([sayi, yazi], i) => (
            <Belir key={yazi} gecikme={i * 110} className="rakam">
              <strong><Sayac hedef={sayi} /></strong>
              <span>{yazi}</span>
            </Belir>
          ))}
        </div>
      </section>

      {/* ---------- kurucunun mektubu ---------- */}
      <section className="mektup">
        <div className="mektup-resim">
          <Image
            src="/img/atmosfer/cilek.webp"
            alt="Erimiş çikolataya batırılmış çilek"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <Belir className="mektup-yazi">
          <p className="ust-baslik">Merhaba</p>
          <p className="ilk">
            Çikolata sevgisiyle çıktığımız bu yolda, en kaliteli malzemeleri ve özenle seçilmiş kakao
            çekirdeklerini kullanarak lezzet dolu ürünler sunuyoruz.
          </p>
          <p>
            Yolculuğum İstanbul'da bir çikolata fabrikasının üretim bandında başladı. Bugün
            memleketim Afyonkarahisar'da, Şuhut'taki tesisimizde 30 kişilik ekibimizle üretiyor,
            ürünlerimizi Türkiye'nin dört bir yanına ve 11 ülkeye gönderiyoruz.
          </p>
          <p>
            MB Çikolata sadece bir çikolata markası değil; sevginin ve tutkunun simgesi. Sizi bu
            lezzet yolculuğuna davet ediyoruz.
          </p>
          <p className="imza-not">Sevgi ve çikolata dolu günler dilerim,</p>
          <p className="imza">Resul Baskı</p>
          <p className="imza-unvan">Kurucu</p>
        </Belir>
      </section>

      {/* ---------- tesis ---------- */}
      <section className="bolum">
        <div className="kap tesis">
          <Belir>
            <p className="ust-baslik">Şuhut OSB</p>
            <h2>Üretimi kendi tesisimizde yapıyoruz</h2>
            <p>
              TKDK desteğiyle kurduğumuz tesiste kapasitemizi yüzde 150 artırdık. Hem iç pazara hem
              ihracata düzenli sevkiyat yapabiliyoruz.
            </p>
            <Link href="/hakkimizda" className="ok-link">
              Hikayemizi okuyun <span aria-hidden="true">→</span>
            </Link>
          </Belir>
          <dl className="tesis-bilgi">
            {[
              ["2.000 m²", "kapalı üretim alanı"],
              ["%150", "kapasite artışı"],
              ["30", "kişilik ekip"],
              ["Helal", "sertifikalı üretim"],
            ].map(([a, b], i) => (
              <Belir key={b} gecikme={i * 90}>
                <dt>{a}</dt>
                <dd>{b}</dd>
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
              <p className="ust-baslik">Haberler</p>
              <h2>MB Çikolata'dan</h2>
            </div>
            <Link href="/haberler" className="ok-link">
              Tüm haberler <span aria-hidden="true">→</span>
            </Link>
          </Belir>
          <div className="haber-izgara">
            {haberler.slice(0, 3).map((h, i) => (
              <Belir key={h.slug} gecikme={i * 100}>
                <Link href={`/haberler/${h.slug}`} className="haber-karti">
                  <div className="haber-resim">
                    <Image src={h.gorsel} alt="" width={600} height={340} sizes="(max-width: 900px) 100vw, 360px" />
                  </div>
                  <div className="haber-yazi">
                    <span className="etiket">{h.kategori} · {tarihYaz(h.tarih)}</span>
                    <h3>{h.baslik}</h3>
                    <p>{h.ozet}</p>
                  </div>
                </Link>
              </Belir>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
