# MB Çikolata sitesi

Next.js (App Router) ile yazılmış tanıtım ve toptan teklif sitesi. Veritabanı yok, her şey statik üretiliyor.

## Çalıştırma

    npm install
    npm run dev      # http://localhost:3000
    npm run build    # üretim derlemesi

## İçerik nerede

- `data/firma.js`: telefon, adres, sosyal medya, resmi firma bilgileri
- `data/urunler.js`: ürünler (görseller `public/img/urunler/<slug>.webp`)
- `data/haberler.js`: haberler
- `app/`: sayfalar, `components/`: ortak parçalar

Yeni ürün eklerken `public/img/urunler/` içine `<slug>.webp` koymak yeterli.

## GitHub Pages

`main`'e her push'ta `.github/workflows/pages.yml` siteyi derleyip yayınlar.
Repo ayarlarında Settings → Pages → Source: **GitHub Actions** seçili olmalı.

Adres: `https://<kullanici>.github.io/<repo>/`

Kendi alan adını (mbcikolata.com) bağlayınca:

1. `public/CNAME` dosyası oluşturup içine alan adını yaz (`mbcikolata.com`)
2. Settings → Pages → Custom domain alanına aynı adı gir
3. DNS'te alan adını GitHub'a yönlendir

`public/CNAME` varsa workflow alt yolu kullanmaz, site kök adreste açılır.
Not: GitHub Pages sunucu tarafı yönlendirme yapamaz, bu yüzden `next.config.mjs`
içindeki eski WordPress adres yönlendirmeleri sadece Vercel'de çalışır.

## Vercel

Vercel'de "Add New Project" deyip bu repoyu seçin. Framework otomatik "Next.js"
olarak algılanır, başka ayar gerekmez.

## Yayına çıkmadan önce

- `data/firma.js` içindeki `ticariUnvan`, `vergiDairesi`, `vergiNo`, `mersisNo` alanlarını doldurun
- KVKK, gizlilik ve çerez metinleri genel şablondur, bir uzmana okutun
- Instagram adresini kontrol edin
- `public/Katalog.pdf` eski sitedeki dosyadır (16 MB, Ağustos 2024), güncel ve daha hafif bir sürümle değiştirin
- Eski WordPress adreslerinden yönlendirmeler `next.config.mjs` içinde hazır
- `public/img/atmosfer/` içindeki şu görseller eski sitenin temasından (Crems) geldi:
  `trufler-altin.webp`, `trufler-pudra.webp`, `kakao-tablet.webp`, `kakao-cizim.webp`.
  Tema demo görselleri çoğu zaman sadece önizleme için lisanslıdır; kendi çekimlerinizle
  ya da lisanslı fotoğraflarla değiştirin (aynı dosya adıyla koymanız yeterli).
  `cilek.webp` eski siteye 2024'te yüklenmiş, kaynağını kontrol edin.
- Anasayfadaki kurucu mektubu eski sitedeki metinden ve haberlerden derlendi,
  Resul Bey'e okutun.
