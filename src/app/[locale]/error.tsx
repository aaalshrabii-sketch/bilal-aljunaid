'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">😅</div>
        <h2 className="text-2xl font-bold text-text mb-4">
          حدث خطأ ما / An error occurred
        </h2>
        <p className="text-text-secondary mb-8">
          نعتذر عن هذا الخطأ، يرجى المحاولة مرة أخرى
        </p>
        <Button variant="accent" size="lg" onClick={reset}>
          حاول مرة أخرى / Try Again
        </Button>
      </div>
    </div>
  );
}
