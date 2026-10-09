// Hero'da yavaşça yükselen altın tozu. Konumlar sabit, rastgelelik yok (sunucu ve tarayıcı aynı çıktıyı versin).
const parcalar = [
  [6, 5, 14, 0], [14, 3, 19, 6], [23, 4, 16, 2], [31, 6, 22, 9], [39, 3, 17, 4], [47, 5, 20, 11],
  [55, 4, 15, 1], [63, 6, 23, 7], [71, 3, 18, 3], [78, 5, 21, 10], [86, 4, 16, 5], [93, 3, 19, 8],
];

export default function Toz() {
  return (
    <div className="toz" aria-hidden="true">
      {parcalar.map(([x, boy, sure, gecikme], i) => (
        <i key={i} style={{ "--x": `${x}%`, "--b": `${boy}px`, "--s": `${sure}s`, "--g": `-${gecikme}s`, "--r": `${(i % 2 ? 1 : -1) * (20 + i * 6)}px` }} />
      ))}
    </div>
  );
}
