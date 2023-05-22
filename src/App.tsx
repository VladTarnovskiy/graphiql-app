import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Layout from './pages/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import useThemeAndLanguage from './utils/hooks';

const WelcomePage = React.lazy(() => import('./pages/Welcome/Welcome'));
const GraphiQLPage = React.lazy(() => import('./pages/GraphiQL/GraphiQL'));
const AuthorizationPage = React.lazy(() => import('./pages/Authorization/Authorization'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

function App(): JSX.Element {
  useThemeAndLanguage();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<WelcomePage />} />
          <Route
            path="graphi-ql"
            element={
              <PrivateRoute>
                <GraphiQLPage />
              </PrivateRoute>
            }
          />
          <Route path="authorization" element={<AuthorizationPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
