import { Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  path: string;
}

export const PublicRoute = (props: Props) => {
  const Component = props.component;
  return <Route {...props} component={Component} />;
};
