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
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Reset scroll position instantly on route changes to prevent Framer Motion scroll offsets
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

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

  const activeTheme = mounted ? (resolvedTheme || theme || 'dark') : 'dark';

  // Check if current page is Homepage
  const isHomepage = !pathname || pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;

  // Context-aware background determination:
  // 1. Scrolled (Glass Header): Header background is glass (Light in Light Mode, Dark in Dark Mode).
  // 2. Unscrolled Homepage: Background is bg-background (Light in Light Mode, Dark in Dark Mode).
  // 3. Unscrolled Subpage: Background is bg-hero banner (Dark slate in both Light and Dark Modes).
  const isDarkBackground = scrolled
    ? activeTheme === 'dark'
    : isHomepage
    ? activeTheme === 'dark'
    : true;

  const isTransparent = !scrolled && isDarkBackground;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'glass py-3 border-border shadow-sm' 
          : 'bg-transparent py-5 border-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Logo isTransparent={isTransparent} />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink key={item.key} href={item.href} locale={locale} isTransparent={isTransparent}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            
            <div className={cn(
              'flex items-center gap-3 border-s ps-4 transition-colors',
              isTransparent ? 'border-white/20' : 'border-border'
            )}>
              <ThemeToggle isTransparent={isTransparent} />
              <LanguageSwitcher isTransparent={isTransparent} />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <NavbarMobile navItems={navItems} locale={locale} isTransparent={isTransparent} />
        </div>
      </Container>
    </header>
  );
}
