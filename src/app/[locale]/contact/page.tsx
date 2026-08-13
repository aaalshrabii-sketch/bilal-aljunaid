'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/shared/Container/Container';
import { ContactForm } from '@/components/features/Contact/ContactForm';
import companyData from '@/data/company.json';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: isArabic ? 'العنوان' : 'Address',
      value: companyData.contact.address[isArabic ? 'ar' : 'en'],
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('phoneLabel'),
      value: companyData.contact.phoneFormatted,
      href: `tel:+967${companyData.contact.phoneNumber}`,
    },
    {
      icon: <Phone className="w-5 h-5 opacity-75" />,
      label: t('landline'),
      value: companyData.contact.landline,
      href: `tel:${companyData.contact.landline}`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: isArabic ? 'البريد الإلكتروني' : 'Email',
      value: companyData.contact.email,
      href: `mailto:${companyData.contact.email}`,
    },
    {
      icon: <Mail className="w-5 h-5 text-accent" />,
      label: t('adminEmail'),
      value: companyData.contact.adminEmail,
      href: `mailto:${companyData.contact.adminEmail}`,
      sub: t('adminEmailNote'),
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: isArabic ? 'ساعات العمل' : 'Working Hours',
      value: companyData.contact.workingHours[isArabic ? 'ar' : 'en'],
      sub: isArabic ? 'الجمعة: مغلق' : 'Friday: Closed',
    },
  ];

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-hero pt-32 pb-20 px-4 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form component */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl font-bold text-text mb-2">{t('address')}</h2>

            <div className="bg-cards rounded-2xl p-8 border border-border/50 shadow-sm flex flex-col gap-6">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-background transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0 mt-1">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary font-medium mb-1">{info.label}</p>
                    {info.href ? (
                      <p className="text-text font-medium">
                        <a
                          href={info.href}
                          className="hover:text-accent transition-colors inline-block"
                          dir={
                            info.href.startsWith('tel:') || info.href.startsWith('mailto:')
                              ? 'ltr'
                              : undefined
                          }
                        >
                          {info.value}
                        </a>
                      </p>
                    ) : (
                      <p className="text-text font-medium">{info.value}</p>
                    )}
                    {info.sub && (
                      <p className="text-text-secondary text-sm font-medium mt-1">{info.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${companyData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-colors duration-300 shadow-lg shadow-green-500/25"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.003 2.002C6.487 2.002 2 6.487 2 12c0 1.776.465 3.441 1.27 4.892L2 22l5.282-1.247A9.955 9.955 0 0012.003 22C17.52 22 22 17.515 22 12.003c0-5.515-4.48-10-9.997-10.001zM12 20c-1.615 0-3.13-.434-4.437-1.196l-.318-.19-3.134.74.773-3.044-.208-.332A7.963 7.963 0 014 12.003C4 7.589 7.589 4 12.003 4 16.416 4 20 7.584 20 12c0 4.416-3.584 8-8 8z" />
              </svg>
              {isArabic ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
