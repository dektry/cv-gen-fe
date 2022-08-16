import { MediaQueryProps, useMediaQuery } from 'react-responsive';
// eslint-disable-next-line import/no-cycle
import { desktopBreakpoints } from 'theme/breakpoints';

const width = desktopBreakpoints[1] - 1;

export const useIsTablet = (
  config?: MediaQueryProps,
  customMaxDeviceWidth = width,
) => useMediaQuery({ maxWidth: customMaxDeviceWidth, ...config });

export const Tablet = ({ children, ...config }: MediaQueryProps) => {
  const isMobileOrTablet = useIsTablet(config);

  if (typeof children === 'function') {
    return children(isMobileOrTablet);
  }
  return isMobileOrTablet ? children : null;
};
