import { Routes, Route, Navigate } from 'react-router-dom';

import { PageNotFound } from '../PageNotFound';
import { AppRootPublicContainer } from './components/AppRootPublicContainer';

import { publicRoutes, privateRoutes, IRoute } from './utils/constants';
import routes from 'config/routes.json';

interface IAppRouterProps {
  isAuth: boolean;
}

const AppRouter = ({ isAuth }: IAppRouterProps) => {
  if (!isAuth)
    return (
      <Routes>
        {publicRoutes.map((route: IRoute) => (
          <Route path={route.path} element={<route.component />} key={route.path} />
        ))}
        <Route path={routes.any} element={<Navigate to={routes.login} />} />
      </Routes>
    );
  return (
    <Routes>
      <Route path={routes.home} element={<AppRootPublicContainer />}>
        {privateRoutes.map((route: IRoute) => (
          <Route path={route.path} element={<route.component />} key={route.path} />
        ))}
      </Route>

      <Route path={routes.any} element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
