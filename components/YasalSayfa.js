export default function YasalSayfa({ baslik, guncelleme, children }) {
  return (
    <>
      <section className="sayfa-ust">
        <div className="kap">
          <h1>{baslik}</h1>
          <p>Son güncelleme: {guncelleme}</p>
        </div>
      </section>
      <div className="kap bolum">
        <div className="yasal-metin">{children}</div>
      </div>
    </>
  );
}
