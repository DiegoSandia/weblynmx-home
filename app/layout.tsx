import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WeblynMX · Websites that grow businesses.',
  description: 'WeblynMX transforma negocios que se ven amateur en marcas que se ven premium. Sitios, landings y branding nivel agencia, en CDMX.',
};

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="cursor-ring"></div>
        <div id="cursor-dot"></div>
        <div className="grain" aria-hidden="true"></div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
