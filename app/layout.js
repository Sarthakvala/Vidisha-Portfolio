import { Inter } from 'next/font/google';
import './globals.css';

/* DESIGN.md is a single-family system built on Switzer (weights 300/400).
   Switzer is not on Google Fonts; its documented substitute is Inter.
   One family, loaded once — globals.css aliases --font-space and
   --font-mono onto --font-inter so existing selectors keep working. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400'],
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
      className={inter.variable}
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
                  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                  else { document.documentElement.setAttribute('data-theme', 'light'); }
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
