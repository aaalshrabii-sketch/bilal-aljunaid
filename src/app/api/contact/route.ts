import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. قراءة البيانات من الطلب
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

    // 2. التحقق من الحقول الأساسية
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'الرجاء ملء جميع الحقول المطلوبة (الاسم، البريد، والرسالة)' },
        { status: 400 }
      );
    }

    // 3. قراءة المفاتيح البيئية من الخادم
    const serviceId = process.env.EMAILJS_SERVICE_ID || 'service_nhdkgwk';
    const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_jji3wkk';
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || 'zFKyKdILC6tzB2aSR';
    const privateKey = process.env.EMAILJS_PRIVATE_KEY || 'qccrZKZthASxh1WgiLU1u';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'belal25aljunaid@gmail.com';

    // 4. إعداد بيانات الإرسال لـ EmailJS مع دعم Strict Mode (Private Key)
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

    // 5. إرسال الطلب عبر REST API إلى EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailjsData),
    });

    // 6. التحقق من الاستجابة ومعالجة الأخطاء
    if (!response.ok) {
      const errorData = await response.text();
      console.error('EmailJS Error Response:', response.status, errorData);

      return NextResponse.json(
        { error: `فشل إرسال البريد: ${errorData || response.statusText}` },
        { status: response.status }
      );
    }

    // 7. إرجاع استجابة النجاح
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
