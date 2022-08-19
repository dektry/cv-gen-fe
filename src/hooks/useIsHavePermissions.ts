import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/reducers/app';

export const useIsHavePermissions = (permissions: string[]) => {
  const { user } = useSelector(appSelector);

  const existUserPermissions = user?.permissions;
  const handleChange = useCallback(() => {
    let accessGranted = false;
    if (existUserPermissions && permissions.length) {
      accessGranted = !!existUserPermissions.filter(existPermissions => {
        return permissions.includes(existPermissions);
      })?.length;
    }
    if (permissions.length === 0) {
      accessGranted = true;
    }
    return accessGranted;
  }, [permissions, existUserPermissions]);

  return handleChange();
};
