import Image from "next/image";
import Link from "next/link";
import UrunKarti from "@/components/UrunKarti";
import { urunler, urunGorseli, urunBul } from "@/data/urunler";
import { haberler, tarihYaz } from "@/data/haberler";
import { whatsappLink } from "@/data/firma";

export const metadata = {
  alternates: { canonical: "/" },
};

// Vitrinde öne çıkaracağımız ürünler
const vitrin = [
  "mr-resbaa-findikli-draje-80gr",
  "mr-resbaa-cilekli-draje-sutlu-cikolata-80gr",
  "mr-resbaa-binbonbon-draje-80gr",
].map(urunBul);

const secilenler = [
  "mr-resbaa-antep-fistikli-draje-80gr",
  "mr-resbaa-bademli-draje-80gr",
  "mr-resbaa-mangolu-draje-80gr",
  "mr-resbaa-kahve-cekirdekli-draje-80gr",
  "mr-resbaa-biskuvili-draje-80gr",
  "320-gr-kakaolu-findik-kremasi",
  "mr-resbaa-cikolata-taslari-draje-80gr",
  "mr-resbaa-kirazli-draje-80gr",
].map(urunBul);

const rakamlar = [
  ["12", "çeşit Mr ResBaa draje"],
  ["7", "ülkeye ihracat"],
  ["2.000 m²", "üretim tesisi"],
  ["%150", "kapasite artışı"],
];

export default function Anasayfa() {
  return (
    <>
      <section className="kahraman">
        <div className="kap kahraman-ic">
          <div className="kahraman-yazi">
            <p className="ust-baslik">Afyonkarahisar'dan toptan çikolata</p>
            <h1>
              Her ısırıkta <em>kaliteyi</em> hissettiren drajeler
            </h1>
            <p className="giris">
              Fındıktan Antep fıstığına, dondurularak kurutulmuş meyveden kahve çekirdeğine kadar
              12 çeşit sütlü ve beyaz çikolata kaplamalı draje üretiyoruz. Hepsi helal sertifikalı,
              ilave glikoz şurubu yok.
            </p>
            <div className="dugmeler">
              <Link href="/urunler" className="dugme">Ürünleri incele</Link>
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

          <div className="kahraman-resim">
            {vitrin.map((u, i) => (
              <div key={u.slug} className={`paket paket-${i + 1}`}>
                <Image
                  src={urunGorseli(u)}
                  alt={`${u.ad}, Mr ResBaa`}
                  width={420}
                  height={420}
                  sizes="(max-width: 900px) 40vw, 260px"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rakamlar">
        <div className="kap rakam-izgara">
          {rakamlar.map(([sayi, yazi]) => (
            <div key={yazi}>
              <strong>{sayi}</strong>
              <span>{yazi}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bolum">
        <div className="kap">
          <div className="bolum-baslik">
            <p className="ust-baslik">Mr ResBaa serisi</p>
            <h2>Öne çıkan ürünler</h2>
          </div>
          <div className="urun-izgara">
            {secilenler.slice(0, 4).map((u) => (
              <UrunKarti key={u.slug} urun={u} />
            ))}
          </div>
          <div className="ortala">
            <Link href="/urunler" className="dugme ikinci">
              Tüm ürünler ({urunler.length})
            </Link>
          </div>
        </div>
      </section>

      <section className="bolum koyu">
        <div className="kap iki-kolon">
          <div>
            <p className="ust-baslik">Neden biz</p>
            <h2>Üretimi biz yapıyoruz</h2>
            <p>
              Şuhut Organize Sanayi Bölgesi'ndeki 2.000 metrekarelik tesisimizde, 30 kişilik
              ekibimizle üretim yapıyoruz. Yeni tesisle kapasitemiz yüzde 150 arttı; hem iç pazara
              hem ihracata düzenli sevkiyat yapabiliyoruz.
            </p>
            <ul className="ozellik-liste">
              <li>Helal sertifikalı ürünler</li>
              <li>İlave glikoz şurubu içermez</li>
              <li>80 gr zip-lock ambalaj, raf ve toptan satışa uygun</li>
              <li>Irak'tan Almanya'ya 7 ülkeye düzenli ihracat</li>
            </ul>
            <div className="dugmeler">
              <Link href="/hakkimizda" className="dugme ikinci">Hikayemiz</Link>
              <Link href="/bayilik" className="dugme">Bayi olun</Link>
            </div>
          </div>
          <div className="foto-kutu">
            <Image
              src="/img/haber/suhutta-2-000-metrekarelik-yeni-uretim-tesisi.webp"
              alt="Şuhut'taki yeni üretim tesisimiz"
              width={800}
              height={520}
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      <section className="bolum">
        <div className="kap">
          <div className="bolum-baslik">
            <p className="ust-baslik">Katalog</p>
            <h2>Tüm ürünler tek dosyada</h2>
            <p>
              Güncel ürün gamımızı PDF katalogdan inceleyebilir, sipariş için bize doğrudan
              yazabilirsiniz.
            </p>
          </div>
          <div className="ortala">
            <a href="/Katalog.pdf" className="dugme" target="_blank" rel="noopener">
              Kataloğu indir
            </a>
          </div>
        </div>
      </section>

      <section className="bolum koyu">
        <div className="kap">
          <div className="bolum-baslik">
            <p className="ust-baslik">Haberler</p>
            <h2>Son gelişmeler</h2>
          </div>
          <div className="haber-izgara">
            {haberler.slice(0, 3).map((h) => (
              <Link key={h.slug} href={`/haberler/${h.slug}`} className="haber-karti">
                {h.gorsel ? (
                  <Image src={h.gorsel} alt="" width={600} height={340} sizes="(max-width: 900px) 100vw, 360px" />
                ) : (
                  <div className="haber-bos" aria-hidden="true">{h.kategori}</div>
                )}
                <div>
                  <span className="etiket">{h.kategori} · {tarihYaz(h.tarih)}</span>
                  <h3>{h.baslik}</h3>
                  <p>{h.ozet}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
