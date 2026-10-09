import YasalSayfa from "@/components/YasalSayfa";

export const metadata = {
  title: "Çerez Politikası",
  description: "MB Çikolata web sitesinde çerez kullanımı.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default function Cerezler() {
  return (
    <YasalSayfa baslik="Çerez Politikası" guncelleme="Ekim 2026">
      <p>
        Bu sitenin kendi koyduğu bir çerez yok: oturum, analiz ya da reklam çerezi
        kullanmıyoruz, bu yüzden ayrıca onay penceresi de göstermiyoruz.
      </p>

      <h2>İstisna: gömülü harita</h2>
      <p>
        İletişim sayfasındaki Google Haritalar bileşeni yüklendiğinde Google kendi çerezlerini
        bırakabilir. Bunu istemiyorsanız tarayıcınızdan üçüncü taraf çerezlerini engelleyebilir
        veya o sayfayı açmadan telefon ve e-posta ile ulaşabilirsiniz.
      </p>

      <h2>İleride</h2>
      <p>
        Ziyaretçi sayısı ölçmek gibi amaçlarla çerez kullanan bir araç eklersek, önce size onay
        soracağız ve bu sayfayı güncelleyeceğiz.
      </p>
    </YasalSayfa>
  );
}
