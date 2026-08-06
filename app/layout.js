import localFont from 'next/font/local';
import './globals.css';

/* Single-family system on Switzer (300/400), named explicitly by the token
   files in design/reference/. Switzer isn't on Google Fonts, so it was
   previously substituted with Inter — but the direction leans on weight 300
   holding hairline strokes at 64–84px, which Inter 300 renders heavier. The
   real face is self-hosted here rather than pulled from the Fontshare CDN:
   no third-party request on the critical path, and no CSP exception.

   Kept on --font-inter because globals.css already aliases --font-space and
   --font-mono onto it; renaming would mean touching every module. */
const switzer = localFont({
  src: [
    { path: './fonts/Switzer-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Switzer-400.woff2', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
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
      className={switzer.variable}
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
