import { MediaQueryTypes, useMediaQuery } from 'react-responsive';
import { IProps } from './utils/constants';
import { desktopBreakpoints } from 'theme/constants';

const width = desktopBreakpoints[1] - 1;

export const useIsTablet = (
  config?: MediaQueryTypes,
  customMaxDeviceWidth = width,
) => useMediaQuery({ maxWidth: customMaxDeviceWidth, ...config });

export const Tablet = ({ children, ...config }: IProps) => {
  const isMobileOrTablet = useIsTablet(config);

  if (typeof children === 'function') {
    return children(isMobileOrTablet);
  }
  return isMobileOrTablet ? children : null;
};
