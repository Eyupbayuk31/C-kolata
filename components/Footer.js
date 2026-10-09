import Image from "next/image";
import Link from "next/link";
import Damla from "@/components/Damla";
import { firma, whatsappLink } from "@/data/firma";
import { yol } from "@/lib/yol";

export default function Footer() {
  const yil = new Date().getFullYear();
  const resmi = [
    firma.ticariUnvan,
    firma.vergiDairesi && `${firma.vergiDairesi} V.D.`,
    firma.vergiNo && `VN: ${firma.vergiNo}`,
    firma.mersisNo && `MERSİS: ${firma.mersisNo}`,
  ].filter(Boolean);

  return (
    <footer className="alt">
      <Damla ust="var(--zemin)" alt="var(--alt-zemin)" ters />

      <div className="kap alt-cagri">
        <p className="ust-baslik">Toptan sipariş</p>
        <h2>
          Rafınıza <em>Mr ResBaa</em> ekleyin.
        </h2>
        <div className="dugmeler">
          <a
            className="dugme"
            href={whatsappLink("Merhaba, toptan fiyat listesi almak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fiyat listesi iste
          </a>
          <Link className="dugme ikinci" href="/bayilik">Bayi olun</Link>
        </div>
      </div>

      <div className="kap alt-izgara">
        <div>
          <Image src="/img/logo.webp" alt="MB Çikolata" width={150} height={56} />
          <p className="alt-yazi">
            Afyonkarahisar Şuhut'ta üretilen draje, çikolata ve şekerleme. Helal sertifikalı,
            11 ülkeye ihracat.
          </p>
          <p className="sosyal">
            <a href={firma.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={firma.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </p>
        </div>

        <div>
          <h3>Keşfet</h3>
          <ul>
            <li><Link href="/urunler">Ürünler</Link></li>
            <li><Link href="/hakkimizda">Hakkımızda</Link></li>
            <li><Link href="/haberler">Haberler</Link></li>
            <li><Link href="/bayilik">Bayilik başvurusu</Link></li>
            <li><a href={yol("/Katalog.pdf")} target="_blank" rel="noopener">Ürün kataloğu (PDF)</a></li>
          </ul>
        </div>

        <div>
          <h3>İletişim</h3>
          <ul>
            <li><a href={`tel:+${firma.telefonRaw}`}>{firma.telefon}</a></li>
            <li><a href={`tel:+${firma.telefon2Raw}`}>{firma.telefon2}</a></li>
            <li><a href={`mailto:${firma.eposta}`}>{firma.eposta}</a></li>
            <li className="adres">{firma.adres}</li>
          </ul>
        </div>
      </div>

      <div className="kap alt-son">
        <p>
          © {yil} {firma.ad}. Tüm hakları saklıdır.
          {resmi.length > 0 && <span> · {resmi.join(" · ")}</span>}
        </p>
        <p className="yasal">
          <Link href="/kvkk">KVKK</Link>
          <Link href="/gizlilik-politikasi">Gizlilik</Link>
          <Link href="/cerez-politikasi">Çerezler</Link>
        </p>
      </div>
    </footer>
  );
}
