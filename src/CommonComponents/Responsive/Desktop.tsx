import { MediaQueryTypes, useMediaQuery } from 'react-responsive';
import { IProps } from './utils/constants';
import { desktopBreakpoints } from 'theme/constants';

const width = desktopBreakpoints[1];

export const useIsDesktop = (config?: MediaQueryTypes) =>
  useMediaQuery({ minDeviceWidth: width, ...config });

export const Desktop = ({ children, ...config }: IProps) => {
  const isDesktop = useIsDesktop(config);

  if (typeof children === 'function') {
    return children(isDesktop);
  }
  return isDesktop ? children : null;
};
