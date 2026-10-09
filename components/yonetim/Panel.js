"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GitHub } from "@/lib/github";
import Giris from "./Giris";
import UrunPaneli from "./UrunPaneli";
import HaberPaneli from "./HaberPaneli";
import AyarPaneli from "./AyarPaneli";
import DosyaPaneli from "./DosyaPaneli";
import { Bildirim } from "./ortak";

const SAKLAMA_ANAHTARI = "mbc-yonetim";

const sekmeler = [
  { id: "urunler", ad: "Ürünler" },
  { id: "haberler", ad: "Haberler" },
  { id: "ayarlar", ad: "Ayarlar" },
  { id: "dosyalar", ad: "Dosyalar" },
];

export default function Panel({ varsayilanDepo, siteAdresi }) {
  const [gh, setGh] = useState(null);
  const [girisHatasi, setGirisHatasi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [sekme, setSekme] = useState("urunler");
  const [bildirim, setBildirim] = useState(null);
  const [mesgul, setMesgul] = useState(false);
  const [yayin, setYayin] = useState(null);
  const izleme = useRef(0);

  const baglan = useCallback(async ({ depo, token, hatirla }, sessiz = false) => {
    setYukleniyor(true);
    setGirisHatasi("");
    try {
      const yeni = new GitHub(depo, token);
      await yeni.baglan();
      const saklanacak = JSON.stringify({ depo, token });
      try {
        localStorage.removeItem(SAKLAMA_ANAHTARI);
        sessionStorage.removeItem(SAKLAMA_ANAHTARI);
        (hatirla ? localStorage : sessionStorage).setItem(SAKLAMA_ANAHTARI, saklanacak);
      } catch {}
      setGh(yeni);
    } catch (hata) {
      if (!sessiz) setGirisHatasi(hata.message);
      else {
        try {
          localStorage.removeItem(SAKLAMA_ANAHTARI);
          sessionStorage.removeItem(SAKLAMA_ANAHTARI);
        } catch {}
      }
    } finally {
      setYukleniyor(false);
    }
  }, []);

  // daha önce giriş yapılmışsa otomatik bağlan
  useEffect(() => {
    let kayit = null;
    try {
      kayit = JSON.parse(localStorage.getItem(SAKLAMA_ANAHTARI) || sessionStorage.getItem(SAKLAMA_ANAHTARI) || "null");
    } catch {}
    if (kayit?.depo && kayit?.token) baglan({ ...kayit, hatirla: !!localStorage.getItem(SAKLAMA_ANAHTARI) }, true);
    else setYukleniyor(false);
  }, [baglan]);

  function cikis() {
    try {
      localStorage.removeItem(SAKLAMA_ANAHTARI);
      sessionStorage.removeItem(SAKLAMA_ANAHTARI);
    } catch {}
    izleme.current++;
    setGh(null);
    setYayin(null);
  }

  // Kayıttan sonra GitHub'ın siteyi yayınlamasını bekler
  const yayiniIzle = useCallback(
    async (sha) => {
      const benim = ++izleme.current;
      setYayin({ durum: "bekliyor" });
      const bitis = Date.now() + 8 * 60 * 1000;
      while (Date.now() < bitis) {
        await new Promise((r) => setTimeout(r, 6000));
        if (benim !== izleme.current) return;
        const son = await gh.sonYayin();
        if (!son) {
          setYayin({ durum: "bilinmiyor" });
          return;
        }
        if (son.sha === sha && son.durum === "completed") {
          setYayin({ durum: son.sonuc === "success" ? "yayinda" : "hata", url: son.url });
          return;
        }
      }
      if (benim === izleme.current) setYayin({ durum: "bilinmiyor" });
    },
    [gh]
  );

  // Alt panellerin ortak kaydetme yolu: tek commit, yayın takibi, bildirim
  const kaydet = useCallback(
    async (istek, basariMesaji = "Kaydedildi. Site 1-2 dakika içinde güncellenecek.") => {
      setMesgul(true);
      setBildirim(null);
      try {
        const sha = await gh.guncelle(istek);
        setBildirim({ tur: "basari", metin: basariMesaji });
        yayiniIzle(sha);
        return true;
      } catch (hata) {
        setBildirim({ tur: "hata", metin: hata.message });
        return false;
      } finally {
        setMesgul(false);
      }
    },
    [gh, yayiniIzle]
  );

  if (!gh) {
    return <Giris varsayilanDepo={varsayilanDepo} baglan={baglan} hata={girisHatasi} yukleniyor={yukleniyor} />;
  }

  const ortak = { gh, kaydet, mesgul, bildir: setBildirim };
  const durumYazisi = {
    bekliyor: "Site güncelleniyor…",
    yayinda: "Değişiklikler yayında ✓",
    hata: "Yayında bir sorun var",
    bilinmiyor: "Yayın durumu bilinmiyor",
  };

  return (
    <div className="panel">
      <header className="panel-ust">
        <div>
          <strong>MB Çikolata Yönetim</strong>
          <span className="depo">{gh.repo}</span>
        </div>
        <div className="panel-sag">
          {yayin && (
            <span className={`durum ${yayin.durum}`}>
              {durumYazisi[yayin.durum]}
              {yayin.durum === "hata" && yayin.url && (
                <>
                  {" "}
                  <a href={yayin.url} target="_blank" rel="noopener noreferrer">
                    ayrıntı
                  </a>
                </>
              )}
            </span>
          )}
          {siteAdresi && (
            <a href={siteAdresi} target="_blank" rel="noopener noreferrer">
              Siteyi aç ↗
            </a>
          )}
          <button type="button" onClick={cikis}>
            Çıkış
          </button>
        </div>
      </header>

      <nav className="sekmeler" role="tablist">
        {sekmeler.map((s) => (
          <button key={s.id} type="button" role="tab" aria-selected={sekme === s.id} className={sekme === s.id ? "aktif" : undefined} onClick={() => setSekme(s.id)}>
            {s.ad}
          </button>
        ))}
      </nav>

      <Bildirim bildirim={bildirim} kapat={() => setBildirim(null)} />

      <main className="panel-icerik">
        {sekme === "urunler" && <UrunPaneli {...ortak} />}
        {sekme === "haberler" && <HaberPaneli {...ortak} />}
        {sekme === "ayarlar" && <AyarPaneli {...ortak} />}
        {sekme === "dosyalar" && <DosyaPaneli {...ortak} />}
      </main>
    </div>
  );
}
