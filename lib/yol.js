// public klasöründeki dosyalara (PDF, video gibi) giderken alt yolu ekler.
// GitHub Pages'te site /repo-adi/ altında açıldığı için gerekli.
export function yol(adres) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${adres}`;
}
