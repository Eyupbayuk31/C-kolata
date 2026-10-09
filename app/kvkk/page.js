import YasalSayfa from "@/components/YasalSayfa";
import { firma } from "@/data/firma";

export const metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "MB Çikolata kişisel verilerin korunması aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function Kvkk() {
  const unvan = firma.ticariUnvan || firma.ad;

  return (
    <YasalSayfa baslik="KVKK Aydınlatma Metni" guncelleme="Ekim 2026">
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi gereği, kişisel
        verilerinizin nasıl işlendiğini bu metinle bildiriyoruz.
      </p>

      <h2>Veri sorumlusu</h2>
      <p>
        {unvan}, {firma.adres}. E-posta: <a href={`mailto:${firma.eposta}`}>{firma.eposta}</a>
      </p>

      <h2>Hangi verileri alıyoruz</h2>
      <p>
        İletişim ve bayilik formlarında yazdığınız ad soyad, telefon numarası, firma adı, şehir,
        işletme türü ve mesajınız. Bunun dışında sitede sizi tanımlayan bir veri toplamıyoruz.
      </p>

      <h2>Ne için kullanıyoruz</h2>
      <p>
        Fiyat teklifi vermek, bayilik başvurunuzu değerlendirmek, sorularınızı yanıtlamak ve
        sipariş sürecini yürütmek için. Verileriniz pazarlama listesine eklenmez.
      </p>

      <h2>Hukuki sebep</h2>
      <p>
        Talebinizin karşılanması için verinin işlenmesinin gerekli olması ve bir sözleşmenin
        kurulması için ön görüşme yapılması (KVKK m.5/2-c), ayrıca meşru menfaatimiz (m.5/2-f).
      </p>

      <h2>Kimlere aktarıyoruz</h2>
      <p>
        Formlar mesajınızı WhatsApp'a hazır olarak açar; mesajı göndermeniz halinde içerik
        WhatsApp altyapısı üzerinden bize ulaşır. E-posta ile yazarsanız mesajınız e-posta
        sağlayıcımızda tutulur. Yasal zorunluluk dışında üçüncü kişilerle paylaşmıyoruz.
      </p>

      <h2>Ne kadar saklıyoruz</h2>
      <p>
        Görüşme sona erdikten sonra yasal saklama süreleri dolana kadar, bu süreler sonunda
        silinir ya da anonim hale getirilir.
      </p>

      <h2>Haklarınız</h2>
      <p>
        KVKK m.11 uyarınca verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep
        etme, amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlışsa düzeltilmesini,
        şartları oluşmuşsa silinmesini veya yok edilmesini isteme ve kanuna aykırı işleme nedeniyle
        zarar görürseniz zararın giderilmesini talep etme hakkına sahipsiniz.
      </p>
      <p>
        Başvurularınızı <a href={`mailto:${firma.eposta}`}>{firma.eposta}</a> adresine
        yazabilirsiniz; en geç 30 gün içinde cevap veririz.
      </p>
    </YasalSayfa>
  );
}
