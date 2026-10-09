import Image from "next/image";
import Link from "next/link";
import { urunGorseli } from "@/data/urunler";

export default function UrunKarti({ urun, oncelikli = false }) {
  return (
    <Link href={`/urun/${urun.slug}`} className="urun-karti">
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
        <span className="etiket">{urun.kategori}</span>
        <h3>{urun.ad}</h3>
        <p>{urun.ozet}</p>
        <span className="gramaj">{urun.gramaj}</span>
      </div>
    </Link>
  );
}
