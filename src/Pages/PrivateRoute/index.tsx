import { Route, Navigate, RouteProps } from 'react-router-dom';
import paths from 'config/routes.json';
import { useLoggedInState } from 'hooks/useLoggedInState';

interface Props extends RouteProps {
  path: string;
}

export const PrivateRoute = (props: Props) => {
  const isUser = useLoggedInState();
  return isUser ? <Route {...props} /> : <Navigate to={paths.login} />;
};
