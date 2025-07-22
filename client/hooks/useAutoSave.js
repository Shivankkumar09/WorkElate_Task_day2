import { useEffect, useRef } from 'react';

export const useAutoSave = (key, data) => {
  const timer = useRef();

  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, 5000);

    return () => clearInterval(timer.current);
  }, [key, data]);
};