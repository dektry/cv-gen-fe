import { useEffect, useRef } from 'react';

export const useMount = () => {
  const isMount = useRef(true);
  useEffect(() => {
    isMount.current = false;
  }, []);
  return isMount.current;
};
