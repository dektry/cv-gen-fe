import { MediaQueryTypes, useMediaQuery } from 'react-responsive';
import { IProps } from './utils/constants';
import { desktopBreakpoints } from 'theme/constants';

const width = desktopBreakpoints[0] - 1;

export const useIsMobile = (
  config?: MediaQueryTypes,
  customMaxDeviceWidth = width,
) => useMediaQuery({ maxWidth: customMaxDeviceWidth, ...config });

export const Mobile = ({ children, ...config }: IProps) => {
  const isMobile = useIsMobile(config);

  if (typeof children === 'function') {
    return children(isMobile);
  }
  return isMobile ? children : null;
};

export const tabResponsive = (isMobile: boolean) => (isMobile ? 'top' : 'left');
