import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ✅ Server-side Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب').max(100, 'الاسم طويل جداً'),
  email: z.string().email('بريد إلكتروني غير صحيح').max(254),
  phone: z.string().min(9, 'رقم الجوال مطلوب').max(15, 'رقم الجوال طويل جداً'),
  subject: z.string().min(1, 'الموضوع مطلوب').max(200),
  message: z.string().min(10, 'الرسالة قصيرة جداً').max(1000, 'الرسالة طويلة جداً'),
});

// ✅ Rate Limiting - تخزين في الذاكرة (بسيط وفعّال للمشاريع الصغيرة)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60 * 1000; // دقيقة واحدة
const MAX_REQUESTS = 5; // 5 رسائل كحد أقصى في الدقيقة

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // تنظيف السجلات المنتهية الصلاحية
  for (const [key, value] of rateLimit) {
    if (now - value.timestamp > WINDOW_MS) {
      rateLimit.delete(key);
    }
  }

  const record = rateLimit.get(ip);
  if (record) {
    if (record.count >= MAX_REQUESTS) {
      return false; // تجاوز الحد
    }
    record.count++;
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  return true; // مسموح
}

export async function POST(request: NextRequest) {
  try {
    // 1. ✅ Rate Limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'لقد أرسلت العديد من الرسائل، يرجى المحاولة بعد دقيقة' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // 2. ✅ التحقق من Content-Type
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'نوع المحتوى غير صحيح' },
        { status: 415 }
      );
    }

    // 3. ✅ قراءة البيانات
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'بيانات JSON غير صحيحة' },
        { status: 400 }
      );
    }

    // 4. ✅ Server-side Validation باستخدام Zod
    const validatedResult = contactSchema.safeParse(body);
    if (!validatedResult.success) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: validatedResult.error.issues },
        { status: 400 }
      );
    }

    // 5. ✅ Sanitization - تنظيف البيانات من محتوى خبيث
    const sanitizedData = {
      name: validatedResult.data.name.replace(/[<>"']/g, '').trim(),
      email: validatedResult.data.email.toLowerCase().trim(),
      phone: validatedResult.data.phone.replace(/[^0-9+\-\s]/g, '').trim(),
      subject: validatedResult.data.subject.replace(/[<>"']/g, '').trim(),
      message: validatedResult.data.message.replace(/[<>"']/g, '').trim(),
    };

    // ✅ لا console.log هنا - لا تسريب لبيانات المستخدم
    // هنا يمكن إرسال بريد إلكتروني عبر مزود SMTP آمن
    // مثال: await sendEmail(sanitizedData);
    void sanitizedData; // إسكات تحذير TypeScript مؤقتاً

    return NextResponse.json(
      { message: 'تم إرسال الرسالة بنجاح ✅' },
      { status: 200 }
    );
  } catch {
    // ✅ لا نكشف تفاصيل الخطأ الداخلية للمستخدم
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً' },
      { status: 500 }
    );
  }
}
