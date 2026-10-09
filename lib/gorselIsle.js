// Yüklenen fotoğrafı tarayıcıda küçültüp WebP'ye çevirir; telefon fotoğrafı (5-10 MB) siteyi ağırlaştırmasın.
function blobToBase64(blob) {
  return new Promise((coz, red) => {
    const okuyucu = new FileReader();
    okuyucu.onload = () => coz(String(okuyucu.result).split(",")[1]);
    okuyucu.onerror = () => red(new Error("Dosya okunamadı."));
    okuyucu.readAsDataURL(blob);
  });
}

// kare: ortadan kare kırp (ürün paketleri), değilse oranı koru
export async function gorselHazirla(dosya, { genislik = 1200, kare = false, kalite = 0.82 } = {}) {
  if (!dosya.type.startsWith("image/")) throw new Error("Lütfen bir görsel dosyası seçin (JPG, PNG, WebP).");

  let resim;
  try {
    resim = await createImageBitmap(dosya);
  } catch {
    throw new Error("Bu görsel açılamadı. Başka bir dosya deneyin.");
  }

  let kx = 0, ky = 0, kw = resim.width, kh = resim.height;
  if (kare) {
    const kenar = Math.min(resim.width, resim.height);
    kx = Math.round((resim.width - kenar) / 2);
    ky = Math.round((resim.height - kenar) / 2);
    kw = kh = kenar;
  }
  const oran = Math.min(1, genislik / kw);
  const tuval = document.createElement("canvas");
  tuval.width = Math.round(kw * oran);
  tuval.height = Math.round(kh * oran);
  tuval.getContext("2d").drawImage(resim, kx, ky, kw, kh, 0, 0, tuval.width, tuval.height);

  const blob = await new Promise((coz) => tuval.toBlob(coz, "image/webp", kalite));
  if (!blob || blob.type !== "image/webp") {
    throw new Error("Bu tarayıcı WebP üretemiyor. Lütfen güncel Chrome ya da Edge kullanın.");
  }
  return { base64: await blobToBase64(blob), onizleme: URL.createObjectURL(blob), boyut: blob.size };
}

export async function dosyaBase64(dosya) {
  return blobToBase64(dosya);
}
