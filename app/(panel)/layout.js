import "./yonetim.css";

export const metadata = {
  title: "Yönetim Paneli | MB Çikolata",
  robots: { index: false, follow: false },
};

// Panel sitenin koyu tasarımından bağımsız, sade ve açık renkli
export default function PanelLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
