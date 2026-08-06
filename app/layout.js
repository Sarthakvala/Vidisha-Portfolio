import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Vidisha Todkar — Senior Brand & Growth Strategist',
  description: 'Senior Brand & Growth Strategist with 8+ years turning consumer and cultural insight into commercial growth across FMCG, fintech, streaming, and e-commerce.',
  openGraph: {
    title: 'Vidisha Todkar — Senior Brand & Growth Strategist',
    description: 'Architect of the RuPay content strategy that grew market share 15% against Visa & Mastercard, and a Cannes Lions 2026-shortlisted campaign for Johnson\'s Baby.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vidisha Todkar',
              jobTitle: 'Senior Brand & Growth Strategist',
              email: 'vidishatodkar2010@gmail.com',
              telephone: '+919130084874',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ahmedabad',
                addressRegion: 'Gujarat',
                addressCountry: 'IN',
              },
              alumniOf: [
                { '@type': 'CollegeOrUniversity', name: 'MICA Ahmedabad' },
                { '@type': 'CollegeOrUniversity', name: 'School of Fashion Technology, Pune' },
              ],
              worksFor: { '@type': 'Organization', name: 'BBDO Mumbai' },
              sameAs: ['https://linkedin.com/in/vidishatodkar'],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t) { document.documentElement.setAttribute('data-theme', t); }
                  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
