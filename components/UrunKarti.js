import Image from "next/image";
import Link from "next/link";
import { dilYol } from "@/lib/dil";
import { urunGorseli } from "@/lib/gorsel";

// urun: { slug, ad, ozet, kategori (etiket), gramaj, renk }  — metinler zaten dile çevrilmiş gelir
export default function UrunKarti({ urun, lang, incele, altYazi, oncelikli = false }) {
  return (
    <Link href={dilYol(lang, `/urun/${urun.slug}`)} className="urun-karti" style={{ "--urun-renk": urun.renk }}>
      <div className="urun-resim">
        <Image
          src={urunGorseli(urun)}
          alt={`${urun.ad}, Mr ResBaa ${urun.gramaj}`}
          width={600}
          height={600}
          sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
          priority={oncelikli}
        />
      </div>
      <div className="urun-yazi">
        <span className="urun-ust">
          <i className="renk-nokta" aria-hidden="true" />
          {urun.kategori} · {urun.gramaj}
        </span>
        <h3>{urun.ad}</h3>
        <p>{urun.ozet}</p>
        <span className="urun-git">
          {incele} <span aria-hidden="true">{altYazi}</span>
        </span>
      </div>
    </Link>
  );
}
