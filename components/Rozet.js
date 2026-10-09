// Hero'daki yavaşça dönen yuvarlak yazı.
export default function Rozet({ yazi }) {
  return (
    <div className="rozet" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id="rozet-cember" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="var(--zemin)" stroke="var(--altin)" strokeWidth="1" />
        <text>
          <textPath href="#rozet-cember" textLength="485">
            {yazi}
          </textPath>
        </text>
        <g transform="translate(100 100)" fill="none" stroke="var(--altin)" strokeWidth="1.4">
          {/* kakao çekirdeği */}
          <ellipse rx="17" ry="27" transform="rotate(-25)" />
          <path d="M-9,-21 C-3,-6 -3,6 9,21" transform="rotate(-25)" />
        </g>
      </svg>
    </div>
  );
}
