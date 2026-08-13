'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  phone: z.string().min(9, 'رقم الجوال مطلوب'),
  subject: z.string().min(1, 'الموضوع مطلوب'),
  message: z.string().min(10, 'الرسالة قصيرة جداً (10 أحرف على الأقل)'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [success]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSuccess(true);
        reset();
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg(
          result.error ||
            (isArabic ? 'حدث خطأ في الإرسال، حاول مرة أخرى' : 'An error occurred, please try again')
        );
      }
    } catch {
      setErrorMsg(
        isArabic ? 'حدث خطأ في الاتصال بالخادم، حاول مرة أخرى' : 'Server connection error, please try again'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const subjects = isArabic
    ? ['استفسار عام', 'طلب عرض سعر', 'خدمات الاستيراد', 'شكوى أو اقتراح']
    : ['General Inquiry', 'Price Quote Request', 'Import Services', 'Complaint or Suggestion'];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-text mb-8">
        {isArabic ? 'أرسل لنا رسالة' : 'Send Us a Message'}
      </h2>

      {/* Success banner */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 p-4 mb-6 text-accent bg-cards border border-accent/20 rounded-xl shadow-lg relative"
        >
          <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
          <span className="font-medium text-sm md:text-base leading-relaxed">{t('success')}</span>
          <button
            onClick={() => setSuccess(false)}
            className={`hover:opacity-80 transition-opacity p-1 rounded-md hover:bg-white/5 shrink-0 ${
              isArabic ? 'mr-auto' : 'ml-auto'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5 text-accent" />
          </button>
        </motion.div>
      )}

      {/* Error banner */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 font-medium"
        >
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-sm">{errorMsg}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label={t('name')}
            placeholder={t('namePlaceholder')}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label={t('phone')}
            type="tel"
            placeholder={t('phonePlaceholder')}
            error={errors.phone?.message}
            dir="ltr"
            {...register('phone')}
          />
        </div>

        <Input
          label={t('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          error={errors.email?.message}
          dir="ltr"
          {...register('email')}
        />

        {/* Subject dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">{t('subject')}</label>
          <select
            className="flex h-11 w-full rounded-md border border-border bg-cards px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent transition-colors"
            {...register('subject')}
            defaultValue=""
          >
            <option value="" disabled className="bg-cards text-text-secondary">
              {t('subjectPlaceholder')}
            </option>
            {subjects.map((sub) => (
              <option key={sub} value={sub} className="bg-cards text-text">
                {sub}
              </option>
            ))}
          </select>
          {errors.subject && (
            <span className="text-xs text-red-500">{errors.subject.message}</span>
          )}
        </div>

        {/* Message area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text">{t('message')}</label>
          <textarea
            rows={5}
            placeholder={t('messagePlaceholder')}
            className="flex w-full rounded-md border border-border bg-cards px-3 py-2 text-sm text-text placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent transition-colors resize-none"
            {...register('message')}
          />
          {errors.message && (
            <span className="text-xs text-red-500">{errors.message.message}</span>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent-light text-white font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('sending')}
            </span>
          ) : (
            t('send')
          )}
        </Button>
      </form>
    </div>
  );
}
