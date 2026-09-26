import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'SWASHA REALTY',
  description: 'Elevated Living, Rooted in Craft. Discover our flagship luxury residences by Swasha Realty.',
  openGraph: {
    title: 'Swasha Realty | Luxury Residences',
    description: 'Elevated Living, Rooted in Craft. Discover our flagship luxury residences by Swasha Realty.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swasha Realty | Luxury Residences',
    description: 'Elevated Living, Rooted in Craft. Discover our flagship luxury residences by Swasha Realty.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-charcoal text-offwhite">
        {children}
      </body>
    </html>
  );
}
