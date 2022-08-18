import { IProps } from './utils/constants';
import { useIsMobile } from './Mobile';

export const Default = ({ children, ...config }: IProps) => {
  const isMobile = useIsMobile(config);

  if (typeof children === 'function') {
    return children(isMobile);
  }
  return !isMobile ? children : null;
};
