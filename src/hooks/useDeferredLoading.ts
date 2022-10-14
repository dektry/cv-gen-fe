import { useEffect, useState } from 'react';
import { useMount } from 'hooks/useMount';

export const useDeferredLoading = (isLoading: boolean, delay = 1000) => {
  const notMounted = useMount();

  const [loadingStart, setLoadingStart] = useState(0);

  useEffect(() => {
    if (notMounted) return;

    if (isLoading) {
      setLoadingStart(performance.now());
    } else {
      const sinceStart = performance.now() - loadingStart;
      if (sinceStart > delay) {
        setLoadingStart(0);
      } else {
        setTimeout(() => setLoadingStart(0), delay - sinceStart);
      }
    }
  }, [isLoading]);

  return !!loadingStart;
};
