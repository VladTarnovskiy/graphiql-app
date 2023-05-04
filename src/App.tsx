import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import WelcomePage from './pages/Welcome/Welcome';
import GraphiQLPage from './pages/GraphiQL/GraphiQL';
import AuthorizationPage from './pages/Authorization/Authorization';
import Footer from './components/Footer/Footer';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/graphi-ql" element={<GraphiQLPage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
