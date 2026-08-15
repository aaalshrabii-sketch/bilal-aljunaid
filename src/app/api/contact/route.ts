import { NextResponse } from 'next/server';

// 🔒 تخزين آمن لـ Rate Limiting في الذاكرة
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: Request) {
  try {
    // 🛡️ 1. Rate Limiting Protection (5 طلبات لكل IP في الدقيقة)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    
    const now = Date.now();
    const windowMs = 60 * 1000; // دقيقة واحدة
    const maxRequests = 5; // 5 رسائل في الدقيقة

    // تنظيف السجلات القديمة المنتهية الصلاحية
    for (const [key, value] of rateLimitMap) {
      if (now - value.timestamp > windowMs) {
        rateLimitMap.delete(key);
      }
    }

    const record = rateLimitMap.get(ip);
    if (record) {
      if (record.count >= maxRequests) {
        return NextResponse.json(
          { error: 'لقد أرسلت العديد من الرسائل، يرجى المحاولة بعد دقيقة' },
          { status: 429 }
        );
      }
      record.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 2. قراءة البيانات من الطلب
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'تنسيق البيانات غير صحيح (JSON Invalid)' },
        { status: 400 }
      );
    }

    const { name, phone, email, subject, title, message } = body;
    const finalSubject = subject || title || 'رسالة جديدة من الموقع';

    // 3. التحقق من الحقول الأساسية (Server-side Validation)
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'الرجاء ملء جميع الحقول المطلوبة (الاسم، البريد، والرسالة)' },
        { status: 400 }
      );
    }

    // 4. قراءة المفاتيح البيئية من الخادم بدون كتابة أي مفاتيح صريحة في الكود المصدري
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const receiverEmail = process.env.RECEIVER_EMAIL;

    if (!serviceId || !templateId || (!publicKey && !privateKey)) {
      console.error('Missing EmailJS server configuration variables');
      return NextResponse.json(
        { error: 'إعدادات البريد غير المكتملة على الخادم' },
        { status: 500 }
      );
    }

    // 5. إعداد بيانات الإرسال لـ EmailJS
    const emailjsData: Record<string, any> = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey || privateKey,
      accessToken: privateKey,
      template_params: {
        name: name,
        from_name: name,
        phone: phone || '',
        email: email,
        from_email: email,
        subject: finalSubject,
        title: finalSubject,
        message: message,
        to_email: receiverEmail,
      },
    };

    // 6. إرسال الطلب عبر REST API إلى EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailjsData),
    });

    // 7. التحقق من الاستجابة ومعالجة الأخطاء
    if (!response.ok) {
      const errorData = await response.text();
      console.error('EmailJS Error Response:', response.status, errorData);

      return NextResponse.json(
        { error: `فشل إرسال البريد: ${errorData || response.statusText}` },
        { status: response.status }
      );
    }

    // 8. إرجاع استجابة النجاح
    return NextResponse.json(
      { message: 'تم إرسال الرسالة بنجاح! ✅' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Server Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'حدث خطأ داخلي في الخادم عند إرسال البريد' },
      { status: 500 }
    );
  }
}
