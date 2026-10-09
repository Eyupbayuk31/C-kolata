import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Hakkımızda – Resul Baskı'nın Hikayesi ve Şuhut Tesisimiz",
  description:
    "MB Çikolata, Resul Baskı'nın bir çikolata fabrikasında işçilikle başlayan hikayesinden doğdu. Bugün Şuhut OSB'deki 2.000 m² tesisinde üretim yapıyor ve 11 ülkeye ihracat gerçekleştiriyor.",
  alternates: { canonical: "/hakkimizda" },
};

const ihracat = ["Irak", "İran", "Endonezya", "Venezuela", "Almanya", "Suudi Arabistan", "Libya"];

export default function Hakkimizda() {
  return (
    <>
      <section className="sayfa-ust">
        <div className="kap">
          <h1>Hakkımızda</h1>
          <p>Bir üretim bandında başlayan, bugün 11 ülkeye çikolata gönderen hikaye.</p>
        </div>
      </section>

      <div className="kap bolum">
        <div className="iki-kolon">
          <div className="yazi-blok">
            <h2>Hikayemiz</h2>
            <p>
              MB Çikolata'nın kurucusu Resul Baskı, sektöre İstanbul'da bir çikolata fabrikasında
              işçi olarak girdi. Üretim bandında, paketleme biriminde çalışarak işin her aşamasını
              yerinde öğrendi; sonra çalıştığı fabrikayı satın aldı.
            </p>
            <p>
              Yatırımını memleketi Afyonkarahisar'a taşıdı. TKDK'dan aldığı yaklaşık 6,76 milyon
              TL'lik geri ödemesiz hibeyle Şuhut Organize Sanayi Bölgesi'nde 2.000 metrekarelik
              bir tesis kurdu. Bu proje TKDK'nın Afyonkarahisar'daki ilk projelerinden biri oldu.
            </p>
            <p>
              Bugün tesiste 30 kişi çalışıyor, kapasite yüzde 150 arttı. Ürünler hem Türkiye'deki
              bayilere hem yurt dışına gidiyor.
            </p>
          </div>
          <div className="foto-kutu">
            <Image
              src="/img/haber/genc-girisimci-resul-baski-hikayesi.webp"
              alt="Resul Baskı'nın hikayesi"
              width={800}
              height={520}
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </div>
        </div>

        <div className="uc-kolon">
          <div className="kutu">
            <h3>Neyi, nasıl üretiyoruz</h3>
            <p>
              Mr ResBaa markasıyla 12 çeşit draje üretiyoruz: fındık, Antep fıstığı, badem, kahve
              çekirdeği, bisküvi, dondurularak kurutulmuş çilek, vişne ve mango, böğürtlen,
              BinBonBon ve çikolata taşları. Ayrıca kakaolu fındık kreması ve çıtır patatesli
              çikolata var.
            </p>
          </div>
          <div className="kutu">
            <h3>Standartlarımız</h3>
            <p>
              Ürünlerimiz helal sertifikalı, drajelerimizde ilave glikoz şurubu kullanmıyoruz.
              Her ürün 80 gr zip-lock ambalajda, raf ve toptan satışa uygun şekilde paketleniyor.
            </p>
          </div>
          <div className="kutu">
            <h3>Hedefimiz</h3>
            <p>
              “Avrupa'ya açıldık, yeni ürünlerle açılmaya devam edeceğiz.” Ürün gamını ve ihracat
              pazarlarını büyütmeye devam ediyoruz.
            </p>
          </div>
        </div>

        <section className="ihracat">
          <h2>Başlıca ihracat pazarlarımız</h2>
          <ul className="ulke-liste">
            {ihracat.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <p>Toplam 11 ülkeye ihracat yapıyoruz; bunların yanında çeşitli Avrupa pazarlarına da sevkiyat var.</p>
        </section>

        <div className="cagri">
          <h2>Birlikte çalışalım</h2>
          <p>Toptan alım, bayilik ya da ihracat için bizimle konuşun.</p>
          <div className="dugmeler">
            <Link className="dugme" href="/bayilik">Bayilik başvurusu</Link>
            <Link className="dugme ikinci" href="/iletisim">İletişim</Link>
          </div>
        </div>
      </div>
    </>
  );
}
