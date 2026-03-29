'use client';
import { useState, useCallback } from 'react';

let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = 'info', message, duration = 3000 }) => {
    const id = ++toastIdCounter;
    setToasts((prev) => {
      const next = [...prev, { id, type, message, duration }];
      // Max 3 stacked toasts — remove oldest if exceeded
      return next.length > 3 ? next.slice(next.length - 3) : next;
    });

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
