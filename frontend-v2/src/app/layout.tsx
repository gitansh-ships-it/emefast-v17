import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'EMEFast AI | Emergency Medical Fast Response System',
  description: 'Emergency medical coordination, hospital intelligence and rapid response.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'EMEFast AI', statusBarStyle: 'black-translucent' },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
};
export const viewport: Viewport = { themeColor: '#050505', viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(() => { try { const t=localStorage.getItem('emefast-theme'); const l=t==='light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches); document.documentElement.classList.toggle('theme-light',l); document.documentElement.classList.toggle('theme-dark',!l); } catch(e) {} })()` }} />
      </head>
      <body>{children}</body>
    </html>;
}
