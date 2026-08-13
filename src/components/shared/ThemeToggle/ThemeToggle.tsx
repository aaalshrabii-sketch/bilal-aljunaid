'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';

interface ThemeToggleProps {
  isTransparent?: boolean;
}

export function ThemeToggle({ isTransparent = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-11 h-11" />; // Placeholder to avoid layout shift
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`w-11 h-11 p-0 rounded-full ${
        isTransparent ? 'hover:bg-white/10' : ''
      }`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-accent" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-accent-light" />
    </Button>
  );
}
