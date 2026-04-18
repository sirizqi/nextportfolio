import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sirizqi.dev'),
  title: {
    default: 'Rizqi Sarasajati — Product Manager, Engineer & Designer',
    template: '%s | siRizqi',
  },
  description:
    'Personal portfolio of Rizqi Sarasajati (siRizqi) — Product Manager, Software Engineer, and UI/UX Designer with 9+ years of experience building digital products.',
  keywords: [
    'Rizqi Sarasajati',
    'siRizqi',
    'Product Manager',
    'Software Engineer',
    'UI/UX Designer',
    'Portfolio',
  ],
  authors: [{ name: 'Rizqi Sarasajati', url: 'https://sirizqi.dev' }],
  creator: 'Rizqi Sarasajati',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sirizqi.dev',
    siteName: 'siRizqi',
    title: 'Rizqi Sarasajati — Product Manager, Engineer & Designer',
    description:
      'Personal portfolio of Rizqi Sarasajati (siRizqi) — 9+ years building digital products.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rizqi Sarasajati Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rizqi Sarasajati — Product Manager, Engineer & Designer',
    description: 'Personal portfolio of Rizqi Sarasajati (siRizqi).',
    creator: '@sirizqi11',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
