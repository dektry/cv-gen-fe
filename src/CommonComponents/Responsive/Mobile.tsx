import { MediaQueryProps, useMediaQuery } from 'react-responsive';
// eslint-disable-next-line import/no-cycle
import { desktopBreakpoints } from 'theme/breakpoints';

const width = desktopBreakpoints[0] - 1;

export const useIsMobile = (
  config?: MediaQueryProps,
  customMaxDeviceWidth = width,
) => useMediaQuery({ maxWidth: customMaxDeviceWidth, ...config });

export const Mobile = ({ children, ...config }: MediaQueryProps) => {
  const isMobile = useIsMobile(config);

  if (typeof children === 'function') {
    return children(isMobile);
  }
  return isMobile ? children : null;
};

export const tabResponsive = (isMobile: boolean) => (isMobile ? 'top' : 'left');
