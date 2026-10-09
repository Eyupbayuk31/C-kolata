import TeklifFormu from "@/components/TeklifFormu";
import { yol } from "@/lib/yol";

export const metadata = {
  title: "Bayilik Başvurusu",
  description:
    "MB Çikolata bayisi olun: Mr ResBaa draje ve çikolata ürünlerini kendi bölgenizde satın. Başvuru formunu doldurun, size dönüş yapalım.",
  alternates: { canonical: "/bayilik" },
};

export default function Bayilik() {
  return (
    <>
      <section className="sayfa-ust">
        <div className="kap">
          <h1>Bayilik başvurusu</h1>
          <p>Market, şekerci, kuruyemişçi ya da distribütörseniz Mr ResBaa'yı rafınıza alın.</p>
        </div>
      </section>

      <div className="kap bolum">
        <div className="iletisim-izgara">
          <div className="yazi-blok">
            <h2>Bizimle çalışmak</h2>
            <ul className="ozellik-liste">
              <li>Mr ResBaa serisinde 12 çeşit helal sertifikalı draje</li>
              <li>80 gr zip-lock ambalaj, raf satışına uygun</li>
              <li>Doğrudan üreticiden toptan fiyat</li>
              <li>Türkiye'nin her yerine sevkiyat</li>
            </ul>
            <p>
              Minimum sipariş miktarı ve fiyatlar bölgeye ve ürün çeşidine göre değişiyor. Formu
              doldurun, size dönüş yapıp ayrıntıları anlatalım.
            </p>
            <p>
              Ürün kataloğunu önceden görmek isterseniz{" "}
              <a href={yol("/Katalog.pdf")} target="_blank" rel="noopener">buradan indirebilirsiniz</a>.
            </p>
          </div>

          <div>
            <h2>Başvuru formu</h2>
            <TeklifFormu bayilik />
          </div>
        </div>
      </div>
    </>
  );
}
