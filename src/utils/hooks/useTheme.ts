import { useEffect, useState } from 'react';


export function useTheme() {

    const getSystemTheme = () => 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
      const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
    
      const applyTheme = (currentTheme : string) => {
        const root = document.documentElement;
        
        if (currentTheme === 'system') {
          currentTheme = getSystemTheme(); 
        }
        
        if (currentTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };
    
      useEffect(() => {
        applyTheme(theme);
      }, [theme]);
    
      useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
          if (theme === 'system') {
            applyTheme('system');
          }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }, [theme]);
    
      const handleLightMode = () => {
        setTheme("light");
        localStorage.setItem('theme', "light");
      };
      const handleDarkMode = () => {
        setTheme("dark");
        localStorage.setItem('theme', "dark");
      };
      const handleSystemMode = () => {
        setTheme("system");
        localStorage.setItem('theme', "system");
      };
  return {handleLightMode, handleDarkMode, handleSystemMode, theme}
}

