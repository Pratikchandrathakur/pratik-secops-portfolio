import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'emerald' | 'violet' | 'blue' | 'red' | 'amber';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentColors: { 400: string; 500: string; 600: string; 900: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// RGB values for Tailwind CSS variables
export const THEMES: Record<Theme, { 400: string; 500: string; 600: string; 900: string }> = {
  emerald: {
    400: '52 211 153',
    500: '16 185 129',
    600: '5 150 105',
    900: '6 78 59',
  },
  violet: {
    400: '167 139 250',
    500: '139 92 246',
    600: '124 58 237',
    900: '76 29 149',
  },
  blue: {
    400: '96 165 250',
    500: '59 130 246',
    600: '37 99 235',
    900: '30 58 138',
  },
  red: {
    400: '248 113 113',
    500: '239 68 68',
    600: '220 38 38',
    900: '127 29 29',
  },
  amber: {
    400: '251 191 36',
    500: '245 158 11',
    600: '217 119 6',
    900: '120 53 15',
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('emerald');

  useEffect(() => {
    const root = document.documentElement;
    const colors = THEMES[theme];
    root.style.setProperty('--color-primary-400', colors[400]);
    root.style.setProperty('--color-primary-500', colors[500]);
    root.style.setProperty('--color-primary-600', colors[600]);
    root.style.setProperty('--color-primary-900', colors[900]);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentColors: THEMES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};