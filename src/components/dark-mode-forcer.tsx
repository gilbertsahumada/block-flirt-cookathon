"use client";

import { useEffect } from 'react';

export function DarkModeForcer() {
  useEffect(() => {
    // Forzar dark mode en el document
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    // Asegurar que el theme persista
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          if (target === document.documentElement || target === document.body) {
            if (!target.classList.contains('dark')) {
              target.classList.add('dark');
            }
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return null;
}