'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

export function Hero() {
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <HeroBackground />
      <Container className="relative z-10 py-20">
        <HeroContent locale={locale} />
      </Container>
    </section>
  );
}
