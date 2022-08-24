import React from 'react';

import LoginContainer from 'Pages/Login';
import { GenerateCV } from 'Pages/GenerateCV/GenerateCV';

import routes from 'config/routes.json';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [{ path: routes.login, component: LoginContainer }];
export const privateRoutes: IRoute[] = [{ path: routes.generateCV, component: GenerateCV }];
