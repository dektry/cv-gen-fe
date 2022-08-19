import React from 'react';
import { useIsHavePermissions } from 'hooks/useIsHavePermissions';

interface IProps {
  children: React.ReactChild | React.ReactChild[];
  permissions: string[];
  customPermission?: () => boolean;
}

export const PermissionGate: React.FunctionComponent<IProps> = ({
  children,
  permissions,
  customPermission,
}: IProps) => {
  let accessGranted = useIsHavePermissions(permissions);
  if (customPermission && !accessGranted) {
    accessGranted = customPermission();
  }
  return accessGranted ? <>{children}</> : null;
};
