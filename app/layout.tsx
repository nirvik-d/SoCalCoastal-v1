import Link from "next/link";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>SoCal Coastal Communities</title>
      </head>
      <body>
        <header className="navigation-bar">
          <Link href="/" className="button rounded">
            <span className="icon-home"></span> Home
          </Link>
          <Link href="/communities" className="button rounded">
            <span>🌊</span> Coastal Communities of Southern California
          </Link>
        </header>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
