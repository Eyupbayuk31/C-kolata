import SayfaUst from "@/components/SayfaUst";

export default function YasalSayfa({ baslik, guncelleme, children }) {
  return (
    <>
      <SayfaUst ustBaslik="Yasal" baslik={baslik}>
        Son güncelleme: {guncelleme}
      </SayfaUst>
      <div className="kap bolum">
        <div className="yasal-metin">{children}</div>
      </div>
    </>
  );
}
