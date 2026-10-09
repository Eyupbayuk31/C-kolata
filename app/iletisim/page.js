import SayfaUst from "@/components/SayfaUst";
import TeklifFormu from "@/components/TeklifFormu";
import { firma, whatsappLink } from "@/data/firma";

export const metadata = {
  title: "İletişim – Toptan Sipariş ve Teklif",
  description:
    "MB Çikolata iletişim: Şuhut OSB, Afyonkarahisar. Telefon +90 555 028 99 52, e-posta satis@mbcikolata.com. Toptan fiyat teklifi için formu doldurun.",
  alternates: { canonical: "/iletisim" },
};

const haritaAdresi = encodeURIComponent("Şuhut OSB 1. Cadde 5. Sokak No:4 Belkaracaören Afyonkarahisar");

export default function Iletisim() {
  return (
    <>
      <SayfaUst ustBaslik="Toptan sipariş" baslik="İletişim">
        Toptan fiyat, numune ve sipariş için bize ulaşın.
      </SayfaUst>

      <div className="kap bolum">
        <div className="iletisim-izgara">
          <div className="iletisim-bilgi">
            <h2>Fabrika</h2>
            <p>{firma.adres}</p>

            <h2>Telefon</h2>
            <p>
              <a href={`tel:+${firma.telefonRaw}`}>{firma.telefon}</a>
              <br />
              <a href={`tel:+${firma.telefon2Raw}`}>{firma.telefon2}</a>
            </p>

            <h2>E-posta</h2>
            <p><a href={`mailto:${firma.eposta}`}>{firma.eposta}</a></p>

            <h2>Çalışma saatleri</h2>
            <dl className="saatler">
              {firma.saatler.map(([gun, saat]) => (
                <div key={gun}>
                  <dt>{gun}</dt>
                  <dd>{saat}</dd>
                </div>
              ))}
            </dl>

            <a
              className="dugme"
              href={whatsappLink("Merhaba, bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp'tan yaz
            </a>
          </div>

          <div id="teklif">
            <h2>Teklif isteyin</h2>
            <TeklifFormu />
          </div>
        </div>

        <iframe
          className="harita"
          title="MB Çikolata fabrika konumu"
          src={`https://www.google.com/maps?q=${haritaAdresi}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
