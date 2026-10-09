"use client";

import { useState } from "react";

const ANAHTAR_ADRESI = "https://github.com/settings/personal-access-tokens/new";

export default function Giris({ varsayilanDepo, baglan, deneme, hata, yukleniyor }) {
  const [depo, setDepo] = useState(varsayilanDepo);
  const [token, setToken] = useState("");
  const [hatirla, setHatirla] = useState(true);

  return (
    <div className="giris-kutu">
      <h1>MB Çikolata Yönetim Paneli</h1>
      <p className="ilk">Ürünleri, haberleri ve iletişim bilgilerini buradan değiştirebilirsiniz. Kaydettiğiniz her değişiklik 1-2 dakika içinde sitede görünür.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          baglan({ depo: depo.trim(), token: token.trim(), hatirla });
        }}
      >
        <label className="alan">
          <span className="alan-etiket">Depo</span>
          <input value={depo} onChange={(e) => setDepo(e.target.value)} placeholder="kullanici/depo-adi" required />
        </label>
        <label className="alan">
          <span className="alan-etiket">Erişim anahtarı (token)</span>
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="github_pat_..." autoComplete="off" required />
        </label>
        <label className="onay">
          <input type="checkbox" checked={hatirla} onChange={(e) => setHatirla(e.target.checked)} />
          Bu bilgisayarda hatırla (ortak bilgisayarda işaretlemeyin)
        </label>

        {hata && (
          <p className="hata-yazi" role="alert">
            {hata}
          </p>
        )}
        <button type="submit" className="birincil" disabled={yukleniyor}>
          {yukleniyor ? "Bağlanıyor…" : "Giriş yap"}
        </button>
      </form>

      <div className="deneme-kutu">
        <p>Anahtarınız yok ya da sadece görmek mi istiyorsunuz?</p>
        <button type="button" className="ikincil" onClick={deneme}>
          Deneme modunda aç
        </button>
        <small>Hiçbir şey kaydedilmez, siteye gönderilmez.</small>
      </div>

      <details className="rehber">
        <summary>Erişim anahtarını nasıl alırım? (bir kez yapılır)</summary>
        <ol>
          <li>
            GitHub'a giriş yapıp <a href={ANAHTAR_ADRESI} target="_blank" rel="noopener noreferrer">bu sayfayı</a> açın.
          </li>
          <li>
            <b>Token name</b>: "MB Çikolata panel" yazın. <b>Expiration</b>: 90 gün seçin.
          </li>
          <li>
            <b>Repository access</b> → <b>Only select repositories</b> → sadece bu siteyi seçin.
          </li>
          <li>
            <b>Permissions → Repository permissions</b> altında <b>Contents</b>: <b>Read and write</b> yapın.
            İsterseniz <b>Actions</b>: <b>Read-only</b> da ekleyin, böylece yayın durumunu görürsünüz.
          </li>
          <li>
            <b>Generate token</b>'a basın, çıkan <code>github_pat_…</code> ile başlayan yazıyı kopyalayıp yukarıya yapıştırın.
          </li>
        </ol>
        <p>Anahtar sadece bu tarayıcıda saklanır, kimseyle paylaşmayın. Süresi dolunca aynı adımlarla yenisini alın.</p>
      </details>
    </div>
  );
}
