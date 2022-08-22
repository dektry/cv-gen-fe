import React, { useEffect, useState } from 'react';
import { PreLoader } from 'common-components/PreLoader';
import { FetchApiGate } from 'common-components/FetchApiGate';
import {
  OOPS,
  POSITION_GROUPS_NOT_FOUND,
  GET_POSITION_GROUPS,
} from 'pages/StartUp/utils/constants';
import { useAppDispatch } from 'store';
import { loadPositionGroups } from 'store/reducers/app';

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
