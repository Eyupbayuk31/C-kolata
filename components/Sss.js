import { doldur } from "@/lib/ui";

// Sık sorulanlar: <details> ile açılıp kapanır, Google için de FAQ verisi basar
export default function Sss({ maddeler, degerler }) {
  const liste = maddeler.map(([soru, cevap]) => [soru, doldur(cevap, degerler)]);
  const veri = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: liste.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
  };
  return (
    <div className="sss">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }} />
      {liste.map(([soru, cevap]) => (
        <details key={soru}>
          <summary>{soru}</summary>
          <p>{cevap}</p>
        </details>
      ))}
    </div>
  );
}
