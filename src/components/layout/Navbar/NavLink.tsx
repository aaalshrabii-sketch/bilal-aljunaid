'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  locale: string;
  children: React.ReactNode;
  onClick?: () => void;
  isTransparent?: boolean;
}

export function NavLink({ href, locale, children, onClick, isTransparent = false }: NavLinkProps) {
  const pathname = usePathname();
  const targetPath = href === '/' ? `/${locale}` : (href.startsWith(`/${locale}`) ? href : `/${locale}${href}`);
  const isActive = pathname === targetPath;

  return (
    <Link
      href={targetPath}
      onClick={onClick}
      prefetch={true}
      scroll={false}
      className={cn(
        'relative font-medium text-sm transition-colors py-2',
        isActive
          ? 'text-accent font-semibold'
          : isTransparent
          ? 'text-white/90 hover:text-accent'
          : 'text-text-secondary hover:text-accent'
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
      )}
    </Link>
  );
}
