import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import CareerSection from '@/components/sections/CareerSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import AwardsSection from '@/components/sections/AwardsSection';
import AvailableForSection from '@/components/sections/AvailableForSection';
import BlogsSection from '@/components/sections/BlogsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Rizqi Sarasajati — Product Manager, Engineer & Designer',
  description:
    'Personal portfolio of Rizqi Sarasajati (siRizqi) — 9+ years building digital products as Product Manager, Software Engineer, and UI/UX Designer.',
  openGraph: {
    title: 'Rizqi Sarasajati — Product Manager, Engineer & Designer',
    description: 'Personal portfolio of Rizqi Sarasajati (siRizqi) — 9+ years building digital products.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CareerSection />
      <PortfolioSection />
      <AwardsSection />
      <AvailableForSection />
      <BlogsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
