'use client';

import { useEffect } from 'react';
import { Hero } from '@/components/features/Hero';
import { About } from '@/components/features/About';
import { Services } from '@/components/features/Services';
import { Products } from '@/components/features/Products';
import { Brands } from '@/components/features/Brands';
import { WhyUs } from '@/components/features/WhyUs';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Products />
      <Brands />
      <WhyUs />
    </>
  );
}
