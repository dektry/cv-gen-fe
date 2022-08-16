import { MediaQueryProps } from 'react-responsive';
// eslint-disable-next-line import/no-cycle
import { useIsMobile } from './Mobile';

export const Default = ({ children, ...config }: MediaQueryProps) => {
  const isMobile = useIsMobile(config);

  if (typeof children === 'function') {
    return children(isMobile);
  }
  return !isMobile ? children : null;
};
