'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

export function Hero() {
  const locale = useLocale();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <Container className="relative z-10">
        <HeroContent locale={locale} />
      </Container>
    </section>
  );
}
