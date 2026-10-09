import Image from "next/image";
import Link from "next/link";
import { firma } from "@/data/firma";

export default function Footer() {
  const yil = new Date().getFullYear();
  const resmi = [firma.ticariUnvan, firma.vergiDairesi && `${firma.vergiDairesi} V.D.`, firma.vergiNo && `VN: ${firma.vergiNo}`, firma.mersisNo && `MERSİS: ${firma.mersisNo}`].filter(Boolean);

  return (
    <footer className="alt">
      <div className="kap alt-izgara">
        <div>
          <Image src="/img/logo.webp" alt="MB Çikolata" width={140} height={52} />
          <p className="alt-yazi">
            Afyonkarahisar'da üretilen toptan draje, çikolata ve şekerleme. Helal sertifikalı,
            ilave glikoz şurubu içermez.
          </p>
          <p className="sosyal">
            <a href={firma.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={firma.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </p>
        </div>

        <div>
          <h3>Sayfalar</h3>
          <ul>
            <li><Link href="/urunler">Ürünler</Link></li>
            <li><Link href="/hakkimizda">Hakkımızda</Link></li>
            <li><Link href="/haberler">Haberler</Link></li>
            <li><Link href="/bayilik">Bayilik başvurusu</Link></li>
            <li><a href="/Katalog.pdf" target="_blank" rel="noopener">Ürün kataloğu (PDF)</a></li>
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
