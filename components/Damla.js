// Bölümler arasındaki çikolata akıntısı. Üstteki bölümün rengi aşağı doğru akıyor.
// Damlalar: [x konumu, uzunluk, genişlik]
const damlalar = [
  [70, 38, 22],
  [205, 74, 30],
  [360, 30, 20],
  [520, 96, 34],
  [700, 46, 24],
  [865, 66, 28],
  [1010, 28, 18],
  [1160, 88, 32],
  [1330, 44, 24],
];

const TABAN = 26;

function yolOlustur() {
  let d = `M0,0 H1440 V${TABAN}`;
  // sağdan sola gidiyoruz ki yol kapalı kalsın
  for (const [x, boy, en] of [...damlalar].sort((a, b) => b[0] - a[0])) {
    const sag = x + en / 2;
    const sol = x - en / 2;
    const dip = TABAN + boy;
    d += ` L${sag + en * 0.7},${TABAN}`;
    d += ` C${sag},${TABAN} ${sag},${TABAN + boy * 0.35} ${sag},${dip - en / 2}`;
    d += ` C${sag},${dip + 2} ${sol},${dip + 2} ${sol},${dip - en / 2}`;
    d += ` C${sol},${TABAN + boy * 0.35} ${sol},${TABAN} ${sol - en * 0.7},${TABAN}`;
  }
  return `${d} L0,${TABAN} Z`;
}

const yol = yolOlustur();

export default function Damla({ ust = "var(--zemin)", alt = "var(--yuzey)", ters = false }) {
  return (
    <div className="damla" style={{ background: alt }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        style={ters ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d={yol} fill={ust} />
      </svg>
    </div>
  );
}
