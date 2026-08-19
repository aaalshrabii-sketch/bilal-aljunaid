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

export function NavLink({ href, children, onClick, isTransparent = false }: NavLinkProps) {
  const pathname = usePathname();

  // With localePrefix:'never', URLs are clean (no /ar or /en prefix).
  // Normalize href to always start with '/'
  const targetPath = href.startsWith('/') ? href : `/${href}`;

  // Strip any locale prefix from current pathname before comparing
  const cleanPathname = pathname.replace(/^\/(ar|en)(\/|$)/, '/').replace(/\/$/, '') || '/';
  const cleanTarget = targetPath.replace(/\/$/, '') || '/';
  const isActive = cleanPathname === cleanTarget;

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
