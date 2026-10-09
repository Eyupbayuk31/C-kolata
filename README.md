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

## Vercel

Vercel'de "Add New Project" deyip bu repoyu seçin. Framework otomatik "Next.js"
olarak algılanır, başka ayar gerekmez.

## Yayına çıkmadan önce

- `data/firma.js` içindeki `ticariUnvan`, `vergiDairesi`, `vergiNo`, `mersisNo` alanlarını doldurun
- KVKK, gizlilik ve çerez metinleri genel şablondur, bir uzmana okutun
- Instagram adresini kontrol edin
- `public/Katalog.pdf` eski sitedeki dosyadır (16 MB, Ağustos 2024), güncel ve daha hafif bir sürümle değiştirin
- Eski WordPress adreslerinden yönlendirmeler `next.config.mjs` içinde hazır
