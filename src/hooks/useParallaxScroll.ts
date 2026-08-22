'use client';

import { useEffect, useRef, useState } from 'react';

export interface ParallaxState {
  // Normalized mouse coordinates from -1 to 1
  mouseX: number;
  mouseY: number;
  // Smoothed mouse coordinates for 60fps interpolation
  smoothMouseX: number;
  smoothMouseY: number;
  // Normalized scroll position (0 at top, 1 at hero height)
  scrollProgress: number;
  // Device indicators
  isMobile: boolean;
}

export function useParallaxScroll(heroHeight: number = 800) {
  const [state, setState] = useState<ParallaxState>({
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
    scrollProgress: 0,
    isMobile: false,
  });

  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseSmoothRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768 || 'ontouchstart' in window;
    };

    const isMobileDevice = checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileDevice) return;
      // Normalize from -1 to 1 centered at middle of screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTargetRef.current = { x, y };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouseTargetRef.current = { x, y };
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const progress = Math.min(Math.max(scrollY / (heroHeight || window.innerHeight), 0), 1.5);
      scrollRef.current = progress;
    };

    const updateAnimation = () => {
      // Smooth lerping factor (0.05 for fluid mechanical dampening)
      const lerp = 0.05;
      mouseSmoothRef.current.x += (mouseTargetRef.current.x - mouseSmoothRef.current.x) * lerp;
      mouseSmoothRef.current.y += (mouseTargetRef.current.y - mouseSmoothRef.current.y) * lerp;

      setState({
        mouseX: mouseTargetRef.current.x,
        mouseY: mouseTargetRef.current.y,
        smoothMouseX: mouseSmoothRef.current.x,
        smoothMouseY: mouseSmoothRef.current.y,
        scrollProgress: scrollRef.current,
        isMobile: isMobileDevice,
      });

      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    animationFrameRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [heroHeight]);

  return state;
}
