import { createContext, useContext, useEffect, useRef, useState } from 'react';

const OptionContext = createContext();

export function OptionProvider({ children }) {
  const [showItemBox, setShowItemBox] = useState(false);
  const itemBoxRef = useRef();
  const clockRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        itemBoxRef.current &&
        !itemBoxRef.current.contains(event.target) &&
        clockRef.current &&
        !clockRef.current.contains(event.target)
      ) {
        setShowItemBox(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [itemBoxRef, clockRef]);

  return (
    <OptionContext.Provider
      value={{ showItemBox, setShowItemBox, itemBoxRef, clockRef }}
    >
      {children}
    </OptionContext.Provider>
  );
}

export const useOptionContext = () => useContext(OptionContext);
