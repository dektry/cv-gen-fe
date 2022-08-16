import { Route, Redirect, RouteProps } from 'react-router-dom';
import { paths } from 'routes/paths';
import { useLoggedInState } from 'utils/hooks/useLoggedInState';

interface Props extends RouteProps {
  path: string;
}

export const PrivateRoute = (props: Props) => {
  const isUser = useLoggedInState();
  return isUser ? <Route {...props} /> : <Redirect to={paths.login} />;
};
