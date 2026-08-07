'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Container } from '@/components/shared/Container/Container';
import { Logo } from '@/components/shared/Logo/Logo';
import { FooterLinks } from './FooterLinks';
import { FooterContact } from './FooterContact';
import navData from '@/data/navigation.json';
import companyData from '@/data/company.json';
import socialData from '@/data/social.json';
import { MessageCircle, Send, Music } from 'lucide-react';

export function Footer() {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const quickLinks = navData.slice(0, 5).map(item => ({
    href: item.href,
    label: t(item.key)
  }));

  return (
    <footer className="bg-cards pt-16 pb-8 border-t border-border/50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Logo />
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {companyData.slogan[locale]}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialData.map((social) => {
                let IconComponent = MessageCircle;
                if (social.icon === 'Send') IconComponent = Send;
                if (social.icon === 'Music') IconComponent = Music;

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:scale-110"
                    aria-label={locale === 'ar' ? social.name : social.nameEn}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinks 
            title={locale === 'ar' ? 'روابط سريعة' : 'Quick Links'} 
            links={quickLinks} 
            locale={locale} 
          />

          {/* Contact Info */}
          <FooterContact
            title={tCommon('contactUs')}
            address={companyData.contact.address[locale]}
            phone={companyData.contact.phoneFormatted}
            email={companyData.contact.email}
          />

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © {currentYear} {companyData.name[locale]}. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <Link href={`/${locale}/privacy`} className="hover:text-accent transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span>|</span>
            <Link href={`/${locale}/terms`} className="hover:text-accent transition-colors">
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
