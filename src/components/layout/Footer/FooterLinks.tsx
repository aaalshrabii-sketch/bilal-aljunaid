import Link from 'next/link';

interface FooterLinksProps {
  title: string;
  links: { label: string; href: string }[];
  locale: string;
}

export function FooterLinks({ title, links, locale }: FooterLinksProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-lg text-text">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const pathWithLocale = link.href === '/' ? `/${locale}` : `/${locale}${link.href}`;
          return (
            <li key={link.href}>
              <Link
                href={pathWithLocale}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
