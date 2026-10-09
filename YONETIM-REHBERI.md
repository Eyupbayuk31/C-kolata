# Site yönetim rehberi

Siteyi kod yazmadan yönetmek için: **`<site adresi>/yonetim`** sayfasını açın.
(Örnek: `https://eyupbayuk31.github.io/C-kolata/yonetim/`)

## İlk giriş (bir kez)

Panel, değişiklikleri GitHub'a kaydeder. Bunun için GitHub'dan bir **erişim anahtarı** gerekir:

1. GitHub'a giriş yapın, <https://github.com/settings/personal-access-tokens/new> sayfasını açın.
2. **Token name**: `MB Çikolata panel`, **Expiration**: 90 gün.
3. **Repository access → Only select repositories** → sitenin deposunu seçin.
4. **Permissions → Repository permissions → Contents → Read and write**.
   (Yayın durumunu görmek isterseniz **Actions → Read-only** de ekleyin.)
5. **Generate token** → çıkan `github_pat_…` yazısını kopyalayıp panele yapıştırın.

Anahtar sadece sizin tarayıcınızda saklanır. Kimseyle paylaşmayın. 90 gün sonra süresi dolar,
aynı adımlarla yenisini alırsınız.

## Neler yapabilirsiniz

| Sekme | Ne yapılır |
|---|---|
| **Ürünler** | Ürün ekle / düzenle / sil, sırayı değiştir, fotoğraf yükle (otomatik küçülür) |
| **Haberler** | Haber ekle / düzenle / sil, fotoğraf yükle |
| **Ayarlar** | Telefon, e-posta, adres, çalışma saatleri, anasayfa rakamları, duyuru bandı, sosyal medya, resmi firma bilgileri |
| **Dosyalar** | Ürün kataloğu PDF'ini değiştir |

Her metin **Türkçe, English, العربية** olarak girilebilir. Bir dilin sekmesinde nokta (●) varsa o dilde
çeviri eksik demektir; boş bırakılırsa Türkçe metin gösterilir. Türkçe zorunludur.

## Kaydedince ne olur

Panel değişikliği tek seferde GitHub'a yazar, GitHub siteyi yeniden derleyip yayınlar. Bu **1-2 dakika** sürer.
Panelin üstünde “Site güncelleniyor… → Değişiklikler yayında ✓” yazısını görürsünüz. Sayfayı yenileyip bakın.

## Haber yazarken

- Paragrafları **boş satırla** ayırın.
- `## Başlık` yazarsanız ara başlık olur.
- `- Yer: İstanbul` gibi satırlar madde işareti olur.

## Sık sorulanlar

- **“Erişim anahtarı geçersiz”**: Süresi dolmuştur, yenisini alın.
- **“İzni yok”**: Anahtarı oluştururken *Contents: Read and write* seçilmemiştir.
- **Yaptığım değişiklik görünmüyor**: 2 dakika bekleyip sayfayı `Ctrl+F5` ile yenileyin. Yayın “hata” derse panelden “ayrıntı”ya tıklayın.
- **Yanlışlıkla sildim**: Her kayıt GitHub'da bir commit'tir, geri alınabilir. Depoda *Commits* sayfasından eski haline döndürülür.
- **Yeni dil eklemek** (ör. Almanca): bir geliştirici gerekir, `README.md`'deki “Yeni dil ekleme” bölümüne bakın.
