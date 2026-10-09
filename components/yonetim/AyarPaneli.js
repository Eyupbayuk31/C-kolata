"use client";

import { useEffect, useState } from "react";
import { Alan, DilSekmeleri, DilliGirdi } from "./ortak";

// saat bazı kayıtlarda düz yazı, bazılarında {tr,en,ar}: hepsini {tr,en,ar} yap
const dilli = (d) => (typeof d === "string" ? { tr: d, en: "", ar: "" } : { tr: "", en: "", ar: "", ...d });

function hazirla(ayar) {
  return {
    ...ayar,
    iletisim: { ...ayar.iletisim, adres: dilli(ayar.iletisim.adres) },
    saatler: ayar.saatler.map((s) => ({ gun: dilli(s.gun), saat: dilli(s.saat) })),
    rakamlar: ayar.rakamlar.map((r) => ({ ...r, etiket: dilli(r.etiket) })),
    duyuru: { ...ayar.duyuru, metin: dilli(ayar.duyuru.metin) },
  };
}

export default function AyarPaneli({ gh, kaydet, mesgul, bildir }) {
  const [a, setA] = useState(null);
  const [dil, setDil] = useState("tr");

  useEffect(() => {
    gh.jsonOku("data/ayarlar.json")
      .then((v) => setA(hazirla(v)))
      .catch((hata) => bildir({ tur: "hata", metin: hata.message }));
  }, []);

  if (!a) return <p className="bos">Yükleniyor…</p>;

  const iletisimGuncelle = (alan) => (deger) => setA((o) => ({ ...o, iletisim: { ...o.iletisim, [alan]: deger } }));
  const dizi = (alan, i, parca) => setA((o) => ({ ...o, [alan]: o[alan].map((x, j) => (j === i ? { ...x, ...parca } : x)) }));

  async function gonder(e) {
    e.preventDefault();
    const temiz = {
      ...a,
      saatler: a.saatler.filter((s) => s.gun.tr.trim()),
      rakamlar: a.rakamlar.map((r) => ({ ...r, sayi: Number(r.sayi) || 0 })),
    };
    const ok = await kaydet({ mesaj: "Panel: site ayarları güncellendi", json: { "data/ayarlar.json": () => temiz } });
    if (ok) setA(hazirla(temiz));
  }

  return (
    <form className="form-sayfa" onSubmit={gonder}>
      <div className="baslik-satir">
        <h2>Site ayarları</h2>
        <DilSekmeleri dil={dil} setDil={setDil} kontrol={[a.iletisim.adres, ...a.saatler.flatMap((s) => [s.gun, s.saat]), ...a.rakamlar.map((r) => r.etiket), a.duyuru.metin]} />
      </div>

      <fieldset>
        <legend>Duyuru bandı</legend>
        <p className="ipucu">Sitenin en üstünde altın renkli bir şerit olarak görünür. Fuar, kampanya gibi duyurular için.</p>
        <label className="onay">
          <input type="checkbox" checked={a.duyuru.aktif} onChange={(e) => setA({ ...a, duyuru: { ...a.duyuru, aktif: e.target.checked } })} />
          Duyuru bandını göster
        </label>
        <DilliGirdi etiket="Duyuru metni" deger={a.duyuru.metin} degistir={(m) => setA({ ...a, duyuru: { ...a.duyuru, metin: m } })} dil={dil} />
        <Alan etiket="Bağlantı (isteğe bağlı)" ipucu="Örnek: https://… Boş bırakırsanız tıklanmaz.">
          <input value={a.duyuru.link} onChange={(e) => setA({ ...a, duyuru: { ...a.duyuru, link: e.target.value } })} />
        </Alan>
      </fieldset>

      <fieldset>
        <legend>İletişim</legend>
        <div className="iki">
          <Alan etiket="Telefon">
            <input value={a.iletisim.telefon} onChange={(e) => iletisimGuncelle("telefon")(e.target.value)} dir="ltr" required />
          </Alan>
          <Alan etiket="İkinci telefon">
            <input value={a.iletisim.telefon2} onChange={(e) => iletisimGuncelle("telefon2")(e.target.value)} dir="ltr" />
          </Alan>
        </div>
        <Alan etiket="E-posta">
          <input type="email" value={a.iletisim.eposta} onChange={(e) => iletisimGuncelle("eposta")(e.target.value)} required />
        </Alan>
        <DilliGirdi etiket="Adres" deger={a.iletisim.adres} degistir={iletisimGuncelle("adres")} dil={dil} satir={2} />
      </fieldset>

      <fieldset>
        <legend>Çalışma saatleri</legend>
        {a.saatler.map((s, i) => (
          <div className="iki" key={i}>
            <DilliGirdi etiket="Gün" deger={s.gun} degistir={(g) => dizi("saatler", i, { gun: g })} dil={dil} />
            <DilliGirdi etiket="Saat" deger={s.saat} degistir={(g) => dizi("saatler", i, { saat: g })} dil={dil} />
          </div>
        ))}
        <button type="button" onClick={() => setA({ ...a, saatler: [...a.saatler, { gun: dilli(""), saat: dilli("") }] })}>
          + Satır ekle
        </button>{" "}
        {a.saatler.length > 0 && (
          <button type="button" onClick={() => setA({ ...a, saatler: a.saatler.slice(0, -1) })}>
            Son satırı sil
          </button>
        )}
      </fieldset>

      <fieldset>
        <legend>Anasayfadaki rakamlar</legend>
        <p className="ipucu">“Ülkeye ihracat” ve “Yıllık tecrübe” rakamları sitenin yazılarında da kullanılır.</p>
        {a.rakamlar.map((r, i) => (
          <div className="iki rakam-satir" key={r.id}>
            <Alan etiket="Rakam">
              <input type="number" min="0" value={r.sayi} onChange={(e) => dizi("rakamlar", i, { sayi: e.target.value })} />
            </Alan>
            <DilliGirdi etiket="Yazısı" deger={r.etiket} degistir={(g) => dizi("rakamlar", i, { etiket: g })} dil={dil} />
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Sosyal medya</legend>
        <div className="iki">
          <Alan etiket="Instagram adresi">
            <input value={a.sosyal.instagram} onChange={(e) => setA({ ...a, sosyal: { ...a.sosyal, instagram: e.target.value } })} dir="ltr" />
          </Alan>
          <Alan etiket="Facebook adresi">
            <input value={a.sosyal.facebook} onChange={(e) => setA({ ...a, sosyal: { ...a.sosyal, facebook: e.target.value } })} dir="ltr" />
          </Alan>
        </div>
      </fieldset>

      <fieldset>
        <legend>Resmi firma bilgileri</legend>
        <p className="ipucu">Doldurursanız sitenin alt kısmında ve KVKK metninde görünür. E-ticaret ve kurumsal güven için önerilir.</p>
        <div className="iki">
          <Alan etiket="Ticari unvan">
            <input value={a.resmi.ticariUnvan} onChange={(e) => setA({ ...a, resmi: { ...a.resmi, ticariUnvan: e.target.value } })} />
          </Alan>
          <Alan etiket="Vergi dairesi">
            <input value={a.resmi.vergiDairesi} onChange={(e) => setA({ ...a, resmi: { ...a.resmi, vergiDairesi: e.target.value } })} />
          </Alan>
        </div>
        <div className="iki">
          <Alan etiket="Vergi numarası">
            <input value={a.resmi.vergiNo} onChange={(e) => setA({ ...a, resmi: { ...a.resmi, vergiNo: e.target.value } })} />
          </Alan>
          <Alan etiket="MERSİS numarası">
            <input value={a.resmi.mersisNo} onChange={(e) => setA({ ...a, resmi: { ...a.resmi, mersisNo: e.target.value } })} />
          </Alan>
        </div>
      </fieldset>

      <div className="form-alt yapisik">
        <button type="submit" className="birincil" disabled={mesgul}>
          {mesgul ? "Kaydediliyor…" : "Ayarları kaydet"}
        </button>
      </div>
    </form>
  );
}
