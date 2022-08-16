import { MediaQueryProps, useMediaQuery } from 'react-responsive';
// eslint-disable-next-line import/no-cycle
import { desktopBreakpoints } from 'theme/breakpoints';

const width = desktopBreakpoints[1];

export const useIsDesktop = (config?: MediaQueryProps) =>
  useMediaQuery({ minDeviceWidth: width, ...config });

export const Desktop = ({ children, ...config }: MediaQueryProps) => {
  const isDesktop = useIsDesktop(config);

  if (typeof children === 'function') {
    return children(isDesktop);
  }
  return isDesktop ? children : null;
};
