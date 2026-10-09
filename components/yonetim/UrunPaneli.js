"use client";

import { useEffect, useState } from "react";
import { gorselHazirla } from "@/lib/gorselIsle";
import { slugYap } from "@/lib/slug";
import { yol } from "@/lib/yol";
import { Alan, DilSekmeleri, DilliGirdi, Onayli } from "./ortak";

const BOS = {
  slug: "",
  renk: "#c9a15b",
  kategori: "draje",
  gramaj: "80 gr",
  ad: { tr: "", en: "", ar: "" },
  ozet: { tr: "", en: "", ar: "" },
  aciklama: { tr: "", en: "", ar: "" },
};

const KATEGORILER = [
  ["draje", "Draje"],
  ["krema", "Krema ve çikolata"],
];

export default function UrunPaneli({ gh, kaydet, mesgul, bildir }) {
  const [liste, setListe] = useState(null);
  const [duzenle, setDuzenle] = useState(null);

  async function yukle() {
    try {
      setListe(await gh.jsonOku("data/urunler.json"));
    } catch (hata) {
      bildir({ tur: "hata", metin: hata.message });
    }
  }
  useEffect(() => {
    yukle();
  }, []);

  async function sirala(slug, yon) {
    const ok = await kaydet(
      {
        mesaj: "Panel: ürün sırası değişti",
        json: {
          "data/urunler.json": (eski) => {
            const i = eski.findIndex((u) => u.slug === slug);
            const j = i + yon;
            if (i < 0 || j < 0 || j >= eski.length) return eski;
            [eski[i], eski[j]] = [eski[j], eski[i]];
            return eski;
          },
        },
      },
      "Sıra kaydedildi. Site 1-2 dakika içinde güncellenecek."
    );
    if (ok) yukle();
  }

  async function sil(urun) {
    const ok = await kaydet(
      {
        mesaj: `Panel: ürün silindi (${urun.ad.tr})`,
        json: { "data/urunler.json": (eski) => eski.filter((u) => u.slug !== urun.slug) },
        dosyalar: [{ yol: `public/img/urunler/${urun.slug}.webp`, sil: true }],
      },
      "Ürün silindi. Site 1-2 dakika içinde güncellenecek."
    );
    if (ok) yukle();
  }

  if (duzenle) {
    return (
      <UrunFormu
        baslangic={duzenle.urun}
        yeni={duzenle.yeni}
        liste={liste}
        mesgul={mesgul}
        kaydet={kaydet}
        bildir={bildir}
        kapat={(yenile) => {
          setDuzenle(null);
          if (yenile) yukle();
        }}
      />
    );
  }

  return (
    <section>
      <div className="baslik-satir">
        <h2>Ürünler {liste && <small>({liste.length})</small>}</h2>
        <button type="button" className="birincil" onClick={() => setDuzenle({ yeni: true, urun: structuredClone(BOS) })}>
          + Yeni ürün
        </button>
      </div>

      {!liste ? (
        <p className="bos">Yükleniyor…</p>
      ) : (
        <ul className="satirlar">
          {liste.map((u, i) => (
            <li key={u.slug}>
              <img src={`${yol(`/img/urunler/${u.slug}.webp`)}`} alt="" width="56" height="56" loading="lazy" />
              <div className="satir-yazi">
                <strong>{u.ad.tr}</strong>
                <span>
                  {KATEGORILER.find((k) => k[0] === u.kategori)?.[1] || u.kategori} · {u.gramaj}
                </span>
              </div>
              <div className="satir-islem">
                <button type="button" onClick={() => sirala(u.slug, -1)} disabled={mesgul || i === 0} aria-label="Yukarı taşı">
                  ↑
                </button>
                <button type="button" onClick={() => sirala(u.slug, 1)} disabled={mesgul || i === liste.length - 1} aria-label="Aşağı taşı">
                  ↓
                </button>
                <button type="button" onClick={() => setDuzenle({ yeni: false, urun: structuredClone(u) })}>
                  Düzenle
                </button>
                <Onayli metin={`"${u.ad.tr}" silinsin mi?`} onay={() => sil(u)} className="tehlike-hafif">
                  Sil
                </Onayli>
              </div>
            </li>
          ))}
          {liste.length === 0 && <li className="bos">Henüz ürün yok.</li>}
        </ul>
      )}
    </section>
  );
}

function UrunFormu({ baslangic, yeni, liste, mesgul, kaydet, bildir, kapat }) {
  const [u, setU] = useState(baslangic);
  const [dil, setDil] = useState("tr");
  const [gorsel, setGorsel] = useState(null);
  const [isleniyor, setIsleniyor] = useState(false);

  const guncelle = (alan) => (deger) => setU((o) => ({ ...o, [alan]: deger }));

  async function gorselSec(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    setIsleniyor(true);
    try {
      setGorsel(await gorselHazirla(dosya, { genislik: 900, kare: true }));
    } catch (hata) {
      bildir({ tur: "hata", metin: hata.message });
    } finally {
      setIsleniyor(false);
    }
  }

  async function gonder(e) {
    e.preventDefault();
    if (!u.ad.tr.trim()) return bildir({ tur: "hata", metin: "Türkçe ürün adı gerekli." });
    if (yeni && !gorsel) return bildir({ tur: "hata", metin: "Yeni ürün için bir görsel yükleyin." });

    let slug = u.slug;
    if (yeni) {
      const temel = slugYap(u.ad.tr) || "urun";
      slug = temel;
      for (let n = 2; liste?.some((x) => x.slug === slug); n++) slug = `${temel}-${n}`;
    }
    const kayit = { slug, renk: u.renk, kategori: u.kategori, gramaj: u.gramaj.trim(), ad: u.ad, ozet: u.ozet, aciklama: u.aciklama };

    const ok = await kaydet({
      mesaj: `Panel: ürün ${yeni ? "eklendi" : "güncellendi"} (${u.ad.tr})`,
      json: {
        "data/urunler.json": (eski) => {
          const i = eski.findIndex((x) => x.slug === slug);
          if (i >= 0) {
            eski[i] = { ...eski[i], ...kayit };
            return eski;
          }
          return [...eski, kayit];
        },
      },
      dosyalar: gorsel ? [{ yol: `public/img/urunler/${slug}.webp`, base64: gorsel.base64 }] : [],
    });
    if (ok) kapat(true);
  }

  const onizleme = gorsel?.onizleme || (!yeni ? yol(`/img/urunler/${u.slug}.webp`) : null);

  return (
    <form className="form-sayfa" onSubmit={gonder}>
      <div className="baslik-satir">
        <h2>{yeni ? "Yeni ürün" : u.ad.tr || "Ürünü düzenle"}</h2>
        <button type="button" onClick={() => kapat(false)}>
          ← Listeye dön
        </button>
      </div>

      <div className="form-izgara">
        <div className="gorsel-kutu">
          {onizleme ? (
            <img src={onizleme} alt="Ürün görseli" />
          ) : (
            <div className="gorsel-bos">Görsel yok</div>
          )}
          <label className="dosya-sec">
            {isleniyor ? "Hazırlanıyor…" : gorsel ? "Başka görsel seç" : yeni ? "Görsel seç *" : "Görseli değiştir"}
            <input type="file" accept="image/*" onChange={gorselSec} hidden />
          </label>
          <small>
            Paketin fotoğrafı. Otomatik olarak kareye kırpılır ve küçültülür
            {gorsel && ` (${Math.round(gorsel.boyut / 1024)} KB)`}.
          </small>
        </div>

        <div className="form-alanlar">
          <div className="iki">
            <Alan etiket="Kategori">
              <select value={u.kategori} onChange={(e) => guncelle("kategori")(e.target.value)}>
                {KATEGORILER.map(([k, ad]) => (
                  <option key={k} value={k}>
                    {ad}
                  </option>
                ))}
              </select>
            </Alan>
            <Alan etiket="Gramaj / miktar" ipucu='Örnek: "80 gr"'>
              <input value={u.gramaj} onChange={(e) => guncelle("gramaj")(e.target.value)} required />
            </Alan>
          </div>

          <Alan etiket="Kart rengi" ipucu="Ürün kartı ve sayfası bu renkte parlar. Paketin ana rengini seçin.">
            <span className="renk-satir">
              <input type="color" value={u.renk} onChange={(e) => guncelle("renk")(e.target.value)} />
              <code>{u.renk}</code>
            </span>
          </Alan>

          <DilSekmeleri dil={dil} setDil={setDil} kontrol={[u.ad, u.ozet, u.aciklama]} />
          <DilliGirdi etiket="Ürün adı" deger={u.ad} degistir={guncelle("ad")} dil={dil} gerekli />
          <DilliGirdi etiket="Kısa açıklama" ipucu="Kartlarda görünen tek cümle." deger={u.ozet} degistir={guncelle("ozet")} dil={dil} />
          <DilliGirdi etiket="Ayrıntılı açıklama" deger={u.aciklama} degistir={guncelle("aciklama")} dil={dil} satir={5} />
        </div>
      </div>

      <div className="form-alt">
        <button type="submit" className="birincil" disabled={mesgul || isleniyor}>
          {mesgul ? "Kaydediliyor…" : "Kaydet"}
        </button>
        <button type="button" onClick={() => kapat(false)}>
          Vazgeç
        </button>
      </div>
    </form>
  );
}
