import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // قراءة اللغة من الـ Cookie مباشرة
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'ar';

  // التأكد من أن اللغة صحيحة
  const validLocale = ['ar', 'en'].includes(locale) ? locale : 'ar';

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});
