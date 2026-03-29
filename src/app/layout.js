import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://dosth.in'),
  title: {
    default: 'Dosth | Your Friend, Your Guide',
    template: '%s | Dosth',
  },
  description:
    'All-in-one urban app for repairs, rides, and community support. Trusted by 50,000+ urban Indians.',
  keywords: [
    'repair services',
    'home services',
    'donations',
    'community support',
    'urban India',
    'Dosth',
    'electronics repair',
    'appliance repair',
  ],
  authors: [{ name: 'Dosth Technologies' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dosth.in',
    siteName: 'Dosth',
    title: 'Dosth | Your Friend, Your Guide',
    description:
      'All-in-one urban app for repairs, rides, and community support. Trusted by 50,000+ urban Indians.',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Dosth Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Dosth | Your Friend, Your Guide',
    description: 'All-in-one urban app for repairs, rides, and community support.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('dosth-theme') || 'light';
                  document.documentElement.setAttribute('data-theme', t);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
