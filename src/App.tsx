import React, { useEffect } from 'react';

import AppRouter from 'common-components/AppRouter';
import { PreLoader } from 'common-components/PreLoader';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';

import { authUser, appSelector } from 'store/reducers/app';

function App() {
  const dispatch = useAppDispatch();

  const { isLoading, isAuth } = useSelector(appSelector);

  useEffect(() => {
    dispatch(authUser());
  }, []);
  if (isLoading) return <PreLoader status="Loading..." />;
  return (
    <div>
      <AppRouter isAuth={true} />
    </div>
  );
}

export default App;
