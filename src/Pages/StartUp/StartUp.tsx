import React, { useEffect, useState } from 'react';
import { PreLoader } from 'components/Molecules/PreLoader/PreLoader';
import { FetchApiGate } from 'components/Atoms/FetchApiGate/FetchApiGate';
import {
  OOPS,
  POSITION_GROUPS_NOT_FOUND,
  GET_POSITION_GROUPS,
} from 'constants/messages';
import { useAppDispatch } from 'store/store';
import { loadPositionGroups } from 'store/app';

interface IProps {
  children: React.ReactNode;
}

export const StartUp = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    (async () => {
      const groups = await dispatch(loadPositionGroups()).unwrap();

      setIsSuccess(groups.length > 1);
      setIsLoading(false);
    })();
  }, [dispatch]);
  return !isLoading ? (
    <FetchApiGate
      isSuccess={isSuccess}
      message={POSITION_GROUPS_NOT_FOUND}
      title={OOPS}
    >
      <>{children}</>
    </FetchApiGate>
  ) : (
    <PreLoader status={GET_POSITION_GROUPS} />
  );
};
