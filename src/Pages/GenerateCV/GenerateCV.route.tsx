import React from 'react';

import { PrivateRoute } from 'utils/routes/PrivateRoute';
import { paths } from 'routes/paths';

const Component = React.lazy(() =>
  import('./GenerateCV').then(m => {
    return {
      default: m.GenerateCV,
    };
  }),
);

const RouteDefinition = (key: string) => {
  return (
    <PrivateRoute path={paths.generateCV} key={key} component={Component} />
  );
};

// eslint-disable-next-line import/no-default-export
export default RouteDefinition;
