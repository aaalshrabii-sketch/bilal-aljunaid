import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-accent mb-4">404</div>
        <h1 className="text-3xl font-bold text-text mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-text-secondary mb-8 text-lg">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>
        <Link
          href="/ar"
          className="inline-flex items-center px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}
