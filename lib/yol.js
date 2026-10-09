// public klasöründeki dosyalara (PDF gibi) düz <a> ile giderken alt yolu ekler.
export function yol(adres) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${adres}`;
}
