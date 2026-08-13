'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';

    const variants = {
      default: 'bg-cards text-text card-shadow',
      elevated: 'bg-cards text-text shadow-lg dark:border dark:border-border/50',
      outlined: 'bg-transparent border border-border text-text',
    };

    return (
      <motion.div
        ref={ref}
        whileHover={
          hover
            ? { y: -8, scale: 1.01 }
            : { y: -4 }
        }
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          baseStyles,
          variants[variant],
          hover && 'hover:card-shadow-hover hover:border-accent/20',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
