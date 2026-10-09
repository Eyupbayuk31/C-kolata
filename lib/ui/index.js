import tr from "./tr";
import en from "./en";
import ar from "./ar";
import { firma, sayi } from "@/data/firma";
import { yerel } from "@/lib/dil";

const sozlukler = { tr, en, ar };

export function ui(dil) {
  return sozlukler[dil] || tr;
}

// "{ulke}" gibi yer tutucuları doldurur
export function doldur(metin, degerler = {}) {
  return String(metin).replace(/\{(\w+)\}/g, (hepsi, anahtar) => (anahtar in degerler ? degerler[anahtar] : hepsi));
}

// Metinlerde sık geçen, ayarlardan gelen değerler
export function ortak(dil) {
  return {
    ulke: sayi("ulke"),
    tecrube: sayi("tecrube"),
    ad: firma.ad,
    adres: yerel(firma.adres, dil),
    eposta: firma.eposta,
    telefon: firma.telefon,
    unvan: firma.ticariUnvan || firma.ad,
  };
}
