import { useDarkMode } from 'hooks/useDarkMode';
import { createContext, useContext } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkModeContext = () => useContext(DarkModeContext);
