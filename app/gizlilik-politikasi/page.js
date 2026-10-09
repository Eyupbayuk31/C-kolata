import Link from "next/link";
import YasalSayfa from "@/components/YasalSayfa";
import { firma } from "@/data/firma";

export const metadata = {
  title: "Gizlilik Politikası",
  description: "MB Çikolata web sitesi gizlilik politikası.",
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function Gizlilik() {
  return (
    <YasalSayfa baslik="Gizlilik Politikası" guncelleme="Ekim 2026">
      <p>
        Bu site {firma.ad} ürünlerini tanıtmak ve toptan taleplerini almak için hazırlandı.
        Ziyaretçilerimizin mahremiyetine saygı duyuyoruz.
      </p>

      <h2>Topladığımız bilgiler</h2>
      <p>
        Sitede üyelik, sepet ya da online ödeme yok. Yalnızca siz formu doldurup gönderirseniz
        yazdığınız bilgileri alıyoruz. Bu bilgilerin nasıl işlendiği{" "}
        <Link href="/kvkk">KVKK aydınlatma metninde</Link> anlatılıyor.
      </p>

      <h2>Takip ve reklam</h2>
      <p>
        Sitede reklam ya da kullanıcı takibi yapan bir araç kullanmıyoruz. İleride ziyaretçi
        istatistiği için bir analiz aracı eklersek bu sayfayı ve{" "}
        <Link href="/cerez-politikasi">çerez politikasını</Link> güncelleriz.
      </p>

      <h2>Üçüncü taraf servisler</h2>
      <p>
        İletişim sayfasında Google Haritalar gömülüdür; harita yüklendiğinde Google kendi
        politikasına göre veri işleyebilir. WhatsApp ve sosyal medya bağlantılarına tıkladığınızda
        ilgili platformun kuralları geçerlidir.
      </p>

      <h2>İletişim</h2>
      <p>
        Sorularınız için <a href={`mailto:${firma.eposta}`}>{firma.eposta}</a> adresine
        yazabilirsiniz.
      </p>
    </YasalSayfa>
  );
}
