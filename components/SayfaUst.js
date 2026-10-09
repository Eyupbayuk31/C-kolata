import Damla from "@/components/Damla";
import { yol } from "@/lib/yol";

// İç sayfaların üst bandı: koyu fotoğraf, başlık, altında çikolata akıntısı
export default function SayfaUst({ ustBaslik, baslik, children, gorsel = "/img/atmosfer/kakao-tablet.webp" }) {
  return (
    <>
      <section className="sayfa-ust" style={{ "--ust-gorsel": `url(${yol(gorsel)})` }}>
        <div className="kap">
          {ustBaslik && <p className="ust-baslik">{ustBaslik}</p>}
          <h1>{baslik}</h1>
          {children && <div className="sayfa-ust-yazi">{children}</div>}
        </div>
      </section>
      <Damla ust="#1a130e" alt="var(--zemin)" />
    </>
  );
}
