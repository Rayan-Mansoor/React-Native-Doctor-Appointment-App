import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../storage/reduxStore';
import { NormalTheme, ProtanopiaTheme, DeuteranopiaTheme, TritanopiaTheme, ColorTheme } from '../types/themes';

type AppTheme = "normal" | "protanopia" | "deuteranopia" | "tritanopia";

interface ThemeContextType {
    theme: ColorTheme;
  }
  
  export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  export const useTheme = (): ColorTheme => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context.theme;
  };

const themeMap: { [key: string]: ColorTheme } = {
  normal: NormalTheme,
  protanopia: ProtanopiaTheme,
  deuteranopia: DeuteranopiaTheme,
  tritanopia: TritanopiaTheme,
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isColorBlindMode, colorBlindTheme} = useSelector((state: RootState) => state.theme);  
  const [theme, setTheme] = useState<AppTheme>(colorBlindTheme);

  useEffect(() => {
    if (isColorBlindMode) {
      setTheme(colorBlindTheme);
    } else {
      setTheme('normal');
    }
  }, [isColorBlindMode, colorBlindTheme]);

  return (
    <ThemeContext.Provider value={{ theme: themeMap[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
