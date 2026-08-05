import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the message (in production: send email, save to DB, etc.)
    console.log('📩 New message from:', body.name);
    console.log('📧 Email:', body.email);
    console.log('📱 Phone:', body.phone);
    console.log('📝 Subject:', body.subject);
    console.log('💬 Message:', body.message);

    return NextResponse.json(
      { message: 'تم إرسال الرسالة بنجاح ✅' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم ❌' },
      { status: 500 }
    );
  }
}
