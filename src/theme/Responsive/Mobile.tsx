import { MediaQueryTypes, useMediaQuery } from 'react-responsive';
import { desktopBreakpoints } from 'theme/constants';

const width = desktopBreakpoints[0] - 1;

export const useIsMobile = (config?: MediaQueryTypes, customMaxDeviceWidth = width) =>
  useMediaQuery({ maxWidth: customMaxDeviceWidth, ...config });

export const tabResponsive = (isMobile: boolean) => (isMobile ? 'top' : 'left');
