import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: '©Ideomētrica',
  description: 'Design Studio Focused on architecture, interior, construction, real Estate appraisal and all things Creative, leading the lenghts of México and northeast.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ideomētrica',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Matamoros 216, Zona Centro',
    addressLocality: 'Monclova',
    addressRegion: 'Coahuila',
    postalCode: '25790',
    addressCountry: 'MX'
  },
  email: 'Hola@Ideomētrica.com',
  telephone: '+52 844 460 95 92',
  url: 'https://www.ideometrica.com', // Reemplazar con el dominio final
  image: '/logo4.png', // Reemplazar con la URL completa del logo
  description: 'Agencia de marketing digital y consultoría creativa en Monclova, Coahuila. Nos especializamos en diseño, análisis de métricas y estrategias de crecimiento para empresas locales.',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '26.90892', // Latitud aproximada para Monclova Centro
    longitude: '-101.4211' // Longitud aproximada para Monclova Centro
  },
  openingHours: 'Mo-Fr 09:00-18:00', // Ejemplo, ajustar al horario real
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Analytics />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
