'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink } from './NavLink';
import { ThemeToggle } from '@/components/shared/ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher/LanguageSwitcher';

interface NavbarMobileProps {
  navItems: { key: string; href: string; label: string }[];
  locale: string;
}

export function NavbarMobile({ navItems, locale }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center gap-2">
      <ThemeToggle />
      <LanguageSwitcher />
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-text hover:text-accent transition-colors"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: locale === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${locale === 'ar' ? 'right-0' : 'left-0'} w-3/4 max-w-sm bg-cards border-${locale === 'ar' ? 'l' : 'r'} border-border z-50 p-6 shadow-xl flex flex-col`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-xl text-text">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-secondary hover:text-accent transition-colors bg-background rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50 pb-2">
                    <NavLink
                      href={item.href}
                      locale={locale}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
