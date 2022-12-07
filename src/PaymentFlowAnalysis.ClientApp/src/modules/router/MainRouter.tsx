import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedReduxRouter } from './ConnectedReduxRouter';
import { AppRouterComponent } from '../../_App_Start/RouteComponentConfig';

export const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ConnectedReduxRouter>
        <AppRouterComponent />
      </ConnectedReduxRouter>
    </BrowserRouter>
  );
};
