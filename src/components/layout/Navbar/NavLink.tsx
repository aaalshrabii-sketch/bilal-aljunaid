'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  locale: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavLink({ href, locale, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const targetPath = href === '/' ? `/${locale}` : (href.startsWith(`/${locale}`) ? href : `/${locale}${href}`);
  const isActive = pathname === targetPath;

  return (
    <Link
      href={targetPath}
      onClick={onClick}
      className={cn(
        'relative font-medium text-sm transition-colors hover:text-accent py-2',
        isActive ? 'text-accent font-semibold' : 'text-text'
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
      )}
    </Link>
  );
}
