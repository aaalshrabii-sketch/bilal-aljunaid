'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', fullWidth = false, children, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
      'disabled:opacity-50 disabled:pointer-events-none shadow-sm';

    const variants = {
      primary: 'bg-primary text-background hover:bg-primary/90 hover:shadow-md',
      secondary: 'bg-cards text-text border border-border hover:bg-border/50 hover:border-accent/40',
      outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow',
      accent: 'bg-accent text-accent-foreground hover:bg-accent-light shadow-glow hover:shadow-glow-lg',
      ghost: 'bg-transparent hover:bg-border/30 text-text hover:text-accent',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-8 text-base',
      lg: 'h-14 px-10 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
