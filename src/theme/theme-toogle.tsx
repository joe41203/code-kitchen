'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import React from 'react';
import { Moon, SunMedium } from 'lucide-react';

export const ThemeToogle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <SunMedium
        size={20}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={20}
        className="rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 absolute prose dark:prose-invert"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
