import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/reducers/app';

export const useLoggedInState = () => {
  const { user } = useSelector(appSelector);

  const handleChange = useCallback(() => {
    return !!user;
  }, [user]);

  return handleChange();
};
