import Link from "next/link";
import { dilYol } from "@/lib/dil";

// Sözlüklerdeki küçük işaretlemeyi çevirir:
//   [yazı](/yol)   -> dile uygun iç bağlantı
//   {eposta}       -> mailto bağlantısı
//   {baska}        -> vars içinden düz metin
export default function Metin({ metin, lang, vars = {} }) {
  const parcalar = [];
  const kural = /\[([^\]]+)\]\(([^)]+)\)|\{(\w+)\}/g;
  let son = 0;
  let eslesme;
  while ((eslesme = kural.exec(metin))) {
    if (eslesme.index > son) parcalar.push(metin.slice(son, eslesme.index));
    if (eslesme[1]) {
      parcalar.push(
        <Link key={eslesme.index} href={dilYol(lang, eslesme[2])}>
          {eslesme[1]}
        </Link>
      );
    } else if (eslesme[3] === "eposta" && vars.eposta) {
      parcalar.push(
        <a key={eslesme.index} href={`mailto:${vars.eposta}`}>
          {vars.eposta}
        </a>
      );
    } else {
      parcalar.push(eslesme[3] in vars ? vars[eslesme[3]] : eslesme[0]);
    }
    son = eslesme.index + eslesme[0].length;
  }
  if (son < metin.length) parcalar.push(metin.slice(son));
  return <>{parcalar}</>;
}
