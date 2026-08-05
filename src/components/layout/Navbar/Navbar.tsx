'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/shared/Container/Container';
import { Logo } from '@/components/shared/Logo/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher/LanguageSwitcher';
import { NavLink } from './NavLink';
import { NavbarMobile } from './NavbarMobile';
import navData from '@/data/navigation.json';
import { cn } from '@/lib/utils';

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = navData.map((item) => ({
    ...item,
    label: t(item.key)
  }));

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'glass py-3 border-white/20 dark:border-white/10 shadow-sm' 
          : 'bg-transparent py-5 border-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink key={item.key} href={item.href} locale={locale}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            
            <div className="flex items-center gap-3 border-s border-border ps-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <NavbarMobile navItems={navItems} locale={locale} />
        </div>
      </Container>
    </header>
  );
}
