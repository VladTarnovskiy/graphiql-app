import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Layout from './pages/Layout/Layout';
import { CloseRoute, OpenRoute } from './components/PrivateRoute/PrivateRoute';

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
              <CloseRoute>
                <GraphiQLPage />
              </CloseRoute>
            }
          />
          <Route
            path="authorization"
            element={
              <OpenRoute>
                <AuthorizationPage />
              </OpenRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
