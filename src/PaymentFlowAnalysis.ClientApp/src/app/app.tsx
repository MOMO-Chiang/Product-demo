import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configure-store';
import { MainRouter } from '../modules/router';
import { SpinnerContainer } from '@modules/spinner';

import './styles/main.scss';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <MainRouter />
    <SpinnerContainer />
  </Provider>
);

export function bootstrapApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

window.addEventListener('storage', (e) => {
  if ((e.oldValue !== null && e.newValue !== null) || e.newValue !== null) {
    if (e.oldValue !== e.newValue) {
      window.location.href = '/admin/login';
    }
  }
});
